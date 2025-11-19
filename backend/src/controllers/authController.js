import { supabase, supabaseAdmin } from '../config/db.js';


// POST - Login do usuário
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validação
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email e senha são obrigatórios'
      });
    }
    
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
        }
      }
    });
  } 
  catch (error) {
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
    
    // Criar usuário PADRÃO do Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome: nome || email.split('@')[0]
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
    const { error: profileError } = await supabaseAdmin
      .from('funcionarios')
      .insert({
        id: data.user.id,
        Nome: nome,
        CPF: cpf,
        Email: email
      });

    if (profileError) {
      return res.status(500).json({ success: false, error: profileError.message });
    }
    
    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso! Verifique seu e-mail para confirmar.',
      data: {
        user: data.user,   
        session: data.session
      }
    })
  }

  catch (error) { // Lida com os tipos de erros do Service

    // Erro de Validação (Senha Curta)
    if (error.message === 'A senha deve ter no mínimo 6 caracteres') {
      return res.status(400).json({ success: false, error: error.message });
    }
    
    // Erro de Duplicata (CPF ou Email)
    if (error.message === 'Este CPF já está cadastrado.' || 
        error.message.includes('User already registered')) {
      return res.status(409).json({ success: false, error: error.message });
    }

    // Outros erros
    res.status(500).json({
      success: false,
      error: error.message || 'Erro interno no servidor'
    });
  }
};

// POST - Função de RECUPERAR SENHA
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'O campo de e-mail é obrigatório.' });
    }

    // Enviar email de recuperação usando Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/update-password`,
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      data: { message: 'Email de recuperação enviado com sucesso.' }
    });
  } 
  catch (error) {
    console.error(`Erro inesperado no servidor: ${error.message}`);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor.'});
  }
};

// POST - Função de ATUALIZAR a senha
export const changePassword = async (req, res) => {
  try {
    const { token, newPassword, newPasswordConfirmation } = req.body;

    // Verifica Campos Obrigatórios
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, error: 'Token e nova senha são obrigatórios.' });
    }

    // Verificar se as senhas conferem
    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({ success: false, error: 'As senhas não conferem.' });
    }

    // Criar um cliente Supabase com o token de recuperação
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseWithToken = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }
    );

    // Atualizar senha usando o cliente com token
    const { error } = await supabaseWithToken.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, message: 'Senha atualizada com sucesso!' });
  } 
  catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// POST - Logout
export const logout = async (req, res) => {
  try {
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
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
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
        }
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
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido'
      });
    }
    
    const token = authHeader.split(' ')[1];
    
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
