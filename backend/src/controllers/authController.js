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

      // Caso o e-mail do usuário não tenha sido confirmado
      if (error.message === 'Email not confirmed') { // Mensagem da documentação do Supabase (Mensagem de erro da DB)
        return res.status(401).json({
          success: false,
          error: 'Por favor, confirme seu email antes de fazer o login.'
        });
      }

      // Se for qualquer outro erro
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
    
    if (error) { // Se usuário já existe na Tabela de Users (Padrão do Supabase)
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    // ============================================================================
    // VERIFICAÇÃO SE JÁ EXISTE UM USUARIO COM O MESMO CPF

    const { data: cpfExistente, error: cpfCheckError } = await supabaseSchema
      .from('Funcionarios')
      .select('CPF')    
      .eq('CPF', cpf)     // Checa se tem um 'cpf' na coluna de 'CPF'
      .maybeSingle();     // Retorna 'null' se não encontrar, ou um objeto se encontrar

    // Se houver um erro na consulta
    if (cpfCheckError) {
        console.error('Erro ao verificar CPF:', cpfCheckError.message);
        return res.status(500).json({ success: false, error: 'Erro interno ao verificar dados.' });
    }

    if (cpfExistente) { // Se CPF já existir, deletar usuário criado
      await supabase.auth.admin.deleteUser(data.user.id);

      return res.status(409).json({ // Erro de duplicata
        success: false,
        error: 'Este CPF já está cadastrado.'
      });
    }
    // ============================================================================

    // Após ter certeza de que não existe esse usuário, criamos ele na outra tabela

    // Registra informações Extras do Funcionário no Supabase na Table "Funcionarios"
    const { error: profileError } = await supabaseSchema
      .from('Funcionarios')
      .insert({
        id: data.user.id, 
        Nome: nome,
        CPF: cpf,
        Email: email,
        Loja: lojaId,
      });

    if (profileError) { 
      return res.status(500).json({ success: false, error: profileError.message });
    }
    

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso! Verifique seu e-mail para confirmar.',
      data: {
        user: data.user,   
        lojaId: lojaId
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

// POST - Função de RECUPERAR SENHA
export const forgotPassword = async (req, res) => {

  const { email } = req.body;
  const { lojaId } = req.params;

  const redirectUrl = `http://localhost:3000/forgotpassword/${lojaId}/updatepassword`;

    try {
      
      // Chama o método de recuperação de senha do Supabase
      const { data, error } = await supabaseSchema.auth.resetPasswordForEmail(email, { // O uso do supabaseSchema não quebra, o ".auth" redireciona pro lugar correto na tabela padrão do Supabase
        redirectTo: redirectUrl,
      });

      if (error) {
            return res.status(400).json({ success: false, error: error.message });
      }

      return res.status(200).json({ success: true, data: { message: 'Email de recuperação enviado com sucesso.' }});
    
    } catch (error) {
        console.error("Erro inesperado no servidor:", error.message);
        return res.status(500).json({ success: false, error: 'Erro interno do servidor.'});
    }
};

// POST - Função de ATUALIZAR a senha
export const changePassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const { lojaId } = req.params;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, error: 'Token e nova senha são obrigatórios.' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'A nova senha deve ter no mínimo 6 caracteres'
      });
    }

    const supabase = getSupabaseClient(lojaId);

    // Pegar o usuário pelo TOKEN fornecido
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) { // Verifica TOKEN
      return res.status(401).json({ success: false, error: 'Token inválido ou expirado.' });
    }

    const { error: updateError } = await supabaseSchema.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );
    
    if (updateError) {
      return res.status(500).json({ success: false, error: updateError.message });
    }

    return res.status(200).json({ success: true, message: 'Senha atualizada com sucesso!' });
    
  } catch (error) {
    console.error("Erro inesperado no updatePassword:", error.message);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor.' });
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
