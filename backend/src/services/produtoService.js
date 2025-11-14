import {supabaseSchema , getSupabaseClient } from '../config/db.js'

async function criarProduto( produtoData) {

    // ===================  REGRAS DE NEGÓCIO  ===========================

    // Verifica se já existe um produto com o mesmo código
    const { data: produtoExistente, error: erroBusca } = await supabaseSchema
        .from('produtos')
        .select('codigo')
        .eq('codigo', produtoData.codigo)
        .single(); // .single() espera 0 ou 1 resultado

    // Se não houver erro e produtoExistente existe --> Produto já cadastrado
    if (produtoExistente && !erroBusca) {
        throw new Error('Já existe um produto cadastrado com este código.');
    }


    // ===================  CADASTRO DO PRODUTO  ===========================

    const { data, error } = await supabaseSchema
        .from('produtos')
        .insert([produtoData])
        .select() // .select() faz o Supabase retornar o objeto que acabou de ser inserido
        .single(); // Esperamos que ele retorne apenas o objeto que inserimos

    if (error) {
        throw new Error(`Não foi possível cadastrar o produto no banco de dados: ${error.message}`);
    }

    return data;
}

async function atualizarProduto( codigo, produtoData) {

  // Verificar o estado atual do produto
    const { data: produtoAtual, error: erroBusca } = await supabaseSchema
    .from('produtos')
    .select('estado')
    .eq('codigo', codigo)
    .single();

  // Se não encontrar o produto, erroBusca não será nulo
    if (erroBusca) {
        throw new Error('Produto não encontrado para atualização.');
    }

  // Se o produto está emprestado, lança um erro
    if (produtoAtual.estado === 'emprestado') {
        throw new Error('Não é possível editar um produto que está emprestado.');
    }

  // Se passou nas validações, atualiza o produto
    const { data, error } = await supabaseSchema
    .from('produtos')
    .update(produtoData) // Atualiza APENAS os campos enviados
    .eq('codigo', codigo) // Onde o código for igual
    .select() // Retorna o objeto atualizado
    .single();

    if (error) {
        console.error('Erro ao atualizar produto:', error.message);
        throw new Error('Não foi possível atualizar o produto no banco de dados.');
    }

    return data;
}

// Exportamos um objeto com todas as funções do model
export const produtoService = {
    criarProduto,
    atualizarProduto,
};