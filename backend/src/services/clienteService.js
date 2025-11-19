import { supabase } from '../config/db.js';

// Listar todos os clientes
export const getAllClientes = async () => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('nome', { ascending: true });

  if (error) {
    throw new Error('Erro ao buscar clientes: ' + error.message);
  }

  return data;
};

// Buscar cliente por ID
export const getClienteById = async (id) => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      throw new Error('Cliente não encontrado');
    }
    throw new Error('Erro ao buscar cliente: ' + error.message);
  }

  return data;
};

// Verificar se CPF já existe
export const checkCpfExists = async (cpf, excludeId = null) => {
  let query = supabase
    .from('clientes')
    .select('id')
    .eq('cpf_cnpj', cpf);

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data } = await query.single();
  return !!data;
};

// Criar novo cliente
export const createCliente = async (clienteData) => {
  const { nome, email, telefone, cpf, endereco, cep, cidade, estado } = clienteData;

  // Validação de campos obrigatórios
  if (!nome || !email || !telefone || !cpf) {
    throw new Error('Nome, email, telefone e CPF são obrigatórios');
  }

  // Verificar CPF duplicado
  const cpfExists = await checkCpfExists(cpf);
  if (cpfExists) {
    throw new Error('Já existe um cliente cadastrado com este CPF');
  }

  const { data, error } = await supabase
    .from('clientes')
    .insert([
      {
        nome,
        email,
        telefone,
        cpf_cnpj: cpf,
        endereco: endereco || null,
        cep: cep || null,
        cidade: cidade || null,
        estado: estado || null,
        status: 'ativo'
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error('Erro ao criar cliente: ' + error.message);
  }

  return data;
};

// Atualizar cliente
export const updateCliente = async (id, clienteData) => {
  const { nome, email, telefone, cpf, endereco, cep, cidade, estado, status } = clienteData;

  // Validação de campos obrigatórios
  if (!nome || !email || !telefone || !cpf) {
    throw new Error('Nome, email, telefone e CPF são obrigatórios');
  }

  // Verificar se cliente existe
  await getClienteById(id);

  // Verificar CPF duplicado
  const cpfInUse = await checkCpfExists(cpf, id);
  if (cpfInUse) {
    throw new Error('CPF já está sendo usado por outro cliente');
  }

  const { data, error } = await supabase
    .from('clientes')
    .update({
      nome,
      email,
      telefone,
      cpf_cnpj: cpf,
      endereco,
      cep: cep || null,
      cidade: cidade || null,
      estado: estado || null,
      status: status || 'ativo'
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error('Erro ao atualizar cliente: ' + error.message);
  }

  return data;
};

// Deletar cliente
export const deleteCliente = async (id) => {
  // Verificar se cliente existe
  await getClienteById(id);

  // Verificar se há pedidos vinculados
  const { data: pedidos } = await supabase
    .from('pedidos')
    .select('id')
    .eq('cliente_id', id)
    .limit(1);

  if (pedidos && pedidos.length > 0) {
    throw new Error('Não é possível excluir cliente com pedidos vinculados');
  }

  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error('Erro ao deletar cliente: ' + error.message);
  }

  return true;
};
