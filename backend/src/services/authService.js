import {supabaseSchema , getSupabaseClient } from '../config/db.js'

const supabase = getSupabaseClient();

export const login = async (email, password, lojaId) => {

  
  // Faz login no Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    // Caso o e-mail do usuário não tenha sido confirmado
    if (error.message === 'Email not confirmed') {

      throw new Error('Por favor, confirme seu email antes de fazer o login.');
    }

    // Se for qualquer outro erro de autenticação
    throw new Error('Email ou senha inválidos');
  }

  return data;
};

export const signup = async (nome, cpf, email, password, lojaId) => {
  
  // ===================  REGRAS DE NEGÓCIO  ===========================

  // =====  SENHA  =====
  if (password.length < 6) {
    throw new Error('A senha deve ter no mínimo 6 caracteres')
  }

  // =====  "CPF" VÁLIDO  =====
  // 1. Remove caracteres não numéricos (pontos, traços) -> REGEX
  const cpfLimpo = String(cpf).replace(/[^\d]/g, '');

  // 2. Verifica se o CPF tem 11 dígitos
  if (cpfLimpo.length !== 11) {
      throw new Error('O CPF deve ter 11 digitos');
  }

  // 3. Verifica se todos os dígitos são iguais (ex: "00000000000")
  // Regex: ^(\d) -> captura o primeiro dígito; \1{10}$ -> verifica se ele se repete 10x
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    throw new Error('O CPF deve ser válido');
  }

  // 4. Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) { 
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  
  let resto = soma % 11;
  let digitoVerificador1 = (resto < 2) ? 0 : (11 - resto);

  // 5. Verifica se o primeiro dígito verificador está correto
  if (digitoVerificador1 !== parseInt(cpfLimpo.charAt(9))) {
    throw new Error('O CPF deve ser válido');
  }

  // 6. Calcula o segundo dígito verificador (incluindo o primeiro DV)
  soma = 0;
  for (let i = 0; i < 10; i++) {
      // Multiplica os 10 primeiros dígitos pela sequência 11, 10, 9...
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  
  resto = soma % 11;
  let digitoVerificador2 = (resto < 2) ? 0 : (11 - resto);

  // 7. Verifica se o segundo dígito verificador está correto
  if (digitoVerificador2 !== parseInt(cpfLimpo.charAt(10))) {
    throw new Error('O CPF deve ser válido');
  }

  // =====  "CPF" JÁ EXISTENTE  =====

  const { data: cpfExistente, error: cpfCheckError } = await supabaseSchema
    .from('funcionarios')
    .select('CPF')    
    .eq('CPF', cpfLimpo)     // Checa se tem um 'cpf' na coluna de 'CPF'
    .maybeSingle();     // Retorna 'null' se não encontrar, ou um objeto se encontrar

  // Se houver um erro na consulta
  if (cpfCheckError) {
    throw new Error('Erro ao verificar CPF:', cpfCheckError.message)
  }

  if (cpfExistente) { // Se CPF já existir 
    throw new Error('Este CPF já está cadastrado.')
  }


  // ===================  REGISTRO no Supabase  ===========================

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
    throw new Error('Esse usuário já existe!')
  }

  // ===================  CRIA USUÁRIO NA TABLE "FUNCIONARIOS"  ===========================

  const { error: profileError } = await supabaseSchema
    .from('funcionarios')
    .insert({
      id: data.user.id, 
      Nome: nome,
      CPF: cpfLimpo,
      Email: email,
      Loja: lojaId,
    });

  if (profileError) {
    // Remove o usuário padrão criado no SUPABASE 
    try {
      await supabase.auth.admin.deleteUser(data.user.id);
    } 
    catch (adminError) {
      console.error('Falha ao reverter usuário órfão do auth:', adminError.message);
    }
    throw new Error(`Ocorreu um erro ao inserir o usuário na tabela Funcionários:${profileError.message}`);
  }

  return data.user
}

export const forgotPassword = async (email, lojaId) => {
 
  const redirectUrl = `http://localhost:3000/${lojaId}/changePassword`;
  
  // Chama o método de recuperação de senha do Supabase
  const { data, error } = await supabaseSchema.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });

  if(error){
    throw new Error(`Ocorreu um erro interno na recuperação de senha: ${error.message}`)
  }

}

export const changePassword = async (token, newPassword, newPasswordConfirmation , lojaId) => {

  // ===================  REGRAS DE NEGÓCIO  ===========================
  
  // Campos obrigatórios
  if(!newPassword || !newPasswordConfirmation){
      throw new Error('Ambos os campos têm que ser preenchidos!')
  }

  // Tamanho da Senha
  if (newPassword.length < 6) {
      throw new Error('A nova senha deve ter no mínimo 6 caracteres')
  }

  // =================== CHANGE PASSWORD   =============================

  // Pegar o usuário pelo TOKEN fornecido
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user) { // Verifica TOKEN
      throw new Error('Token inválido ou expirado.')
    }

    const { error: updateError } = await supabaseSchema.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );
    
    if (updateError) {
      throw new Error(`Erro na atualização da senha ${updateError.message}`)
    }
}

  
  