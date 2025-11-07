import { getSupabaseClient } from '../config/db.js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://khgmbtfxojurshfdhldu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZ21idGZ4b2p1cnNoZmRobGR1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTIzNjg5OCwiZXhwIjoyMDc2ODEyODk4fQ.J44ILd9RA1EBBe4mwFUyfwzrH1_m0666NaS63btNnu0';

const supabaseSchema = createClient(supabaseUrl, supabaseServiceKey, {
  db: {
    schema: 'Leoni-Hub'
  }
});


// POST - Login do usuário
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { lojaId } = req.params;
    
    // Validação
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email e senha são obrigatórios'
      });
    }
    
    // Pega o cliente Supabase da loja selecionada
    const supabase = getSupabaseClient(lojaId);
    
    // Faz login no Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return res.status(401).json({
        success: false,
        error: 'Email ou senha inválidos'
      });
    }
    
    // Retorna token e informações do usuário
    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          created_at: data.user.created_at
        },
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
          expires_at: data.session.expires_at
        },
        lojaId: lojaId
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// POST - Registro de novo usuário
export const signup = async (req, res) => {
  try {
    const { email, password, nome, cpf } = req.body;
    const { lojaId } = req.params;
    
    // Validação
    if (!email || !password || !nome || !cpf) {
      return res.status(400).json({
        success: false,
        error: 'Todos os campos são obrigatórios'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'A senha deve ter no mínimo 6 caracteres'
      });
    }
    
    const supabase = getSupabaseClient(lojaId);
    
    // Criar usuário PADRÃO do Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome: nome || email.split('@')[0],
          loja_id: lojaId
        }
      }
    });
    
    if (error) { // Se usuário já existe
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    // Registra informações Extras do Funcionário no Supabase --> Table Funcionarios
    const { error: profileError } = await supabaseSchema
      .from('Funcionarios') // O nome da sua tabela de usuários
      .insert({
        id: data.user.id, // Vincula o perfil ao usuário do Auth
        Nome: nome,
        CPF: cpf,
        Email: email,
        Loja: lojaId,
      });

    if (profileError) { // Checa se algo deu errado nessa segunda inserção
      return res.status(500).json({ success: false, error: profileError.message });
    }
    
    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso! Verifique seu email para confirmar.',
      data: {
        user: data.user,   
        session: data.session,
        lojaId: lojaId
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// POST - Logout
export const logout = async (req, res) => {
  try {
    const { lojaId } = req.params;
    const supabase = getSupabaseClient(lojaId);
    
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    res.status(200).json({
      success: true,
      message: 'Logout realizado com sucesso'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// GET - Verificar sessão/obter usuário atual
export const getSession = async (req, res) => {
  try {
    const { lojaId } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido'
      });
    }
    
    const token = authHeader.split(' ')[1];
    const supabase = getSupabaseClient(lojaId);
    
    // Verificar token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Token inválido ou expirado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          user_metadata: user.user_metadata
        },
        lojaId
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// GET - Obter usuário atual (alternativa simplificada)
export const getMe = async (req, res) => {
  try {
    const { lojaId } = req.params;
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido'
      });
    }
    
    const token = authHeader.split(' ')[1];
    const supabase = getSupabaseClient(lojaId);
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Não autenticado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
