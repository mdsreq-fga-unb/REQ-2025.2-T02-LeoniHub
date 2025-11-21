import {supabaseSchema} from "../config/db.js";

// Listar todos os produtos
export const getAllProdutos = async () => {
  const { data, error } = await supabaseSchema
    .from('produtos')
    .select('*')
    .order('descricao', { ascending: true });

  if (error) {
    throw new Error('Erro ao buscar produtos: ' + error.message);
  }

  return data;
};

// Buscar produto por ID
export const getProdutoById = async (id) => {
  const { data, error } = await supabaseSchema
    .from('produtos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      throw new Error('Produto não encontrado');
    }
    throw new Error('Erro ao buscar produto: ' + error.message);
  }

  return data;
};

// Verificar se código já existe
export const checkCodigoExists = async (codigo, excludeId = null) => {
  let query = supabaseSchema
    .from('produtos')
    .select('id')
    .eq('codigo', codigo);

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data } = await query.single();
  return !!data;
};

// Criar novo produto
export const createProduto = async (produtoData) => {
  const { 
    codigo, 
    descricao, 
    cor, 
    tamanho, 
    quantidade, 
    valor
  } = produtoData;

  // Validação de campos obrigatórios
  if (!codigo || !descricao || !valor) {
    throw new Error('Código, descrição e valor são obrigatórios');
  }

  // Verificar código duplicado
  const codigoExists = await checkCodigoExists(codigo);
  if (codigoExists) {
    throw new Error('Já existe um produto cadastrado com este código');
  }

  const { data, error } = await supabaseSchema
    .from('produtos')
    .insert([
      {
        codigo,
        descricao,
        cor: cor || null,
        tamanho: tamanho || null,
        quantidade: quantidade || 0,
        valor: parseFloat(valor)
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error('Erro ao criar produto: ' + error.message);
  }

  return data;
};

// Atualizar produto
export const updateProduto = async (id, produtoData) => {
  const { 
    codigo, 
    descricao, 
    cor, 
    tamanho, 
    quantidade, 
    valor
  } = produtoData;

  // Validação de campos obrigatórios
  if (!codigo || !descricao || !valor) {
    throw new Error('Código, descrição e valor são obrigatórios');
  }

  // Verificar se produto existe
  await getProdutoById(id);

  // Verificar código duplicado
  const codigoExists = await checkCodigoExists(codigo, id);
  if (codigoExists) {
    throw new Error('O código informado já está sendo usado por outro produto');
  }

  const { data, error } = await supabaseSchema
    .from('produtos')
    .update({
      codigo,
      descricao,
      cor: cor || null,
      tamanho: tamanho || null,
      quantidade: quantidade || 0,
      valor: parseFloat(valor)
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error('Erro ao atualizar produto: ' + error.message);
  }

  return data;
};

// Deletar produto
export const deleteProduto = async (id) => {
  // Verificar se produto existe
  await getProdutoById(id);

  const { error } = await supabaseSchema
    .from('produtos')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error('Erro ao deletar produto: ' + error.message);
  }

  return { message: 'Produto deletado com sucesso' };
};

// Atualizar quantidade do produto
export const updateQuantidade = async (id, quantidade) => {
  // Verificar se produto existe
  await getProdutoById(id);

  const { data, error } = await supabaseSchema
    .from('produtos')
    .update({ quantidade })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error('Erro ao atualizar quantidade: ' + error.message);
  }

  return data;
};
