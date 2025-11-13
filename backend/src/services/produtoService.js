import {supabaseSchema , getSupabaseClient } from '../config/db.js'

async function criarProduto(lojaId, produtoData) {

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

// Exportamos um objeto com todas as funções do model
export const produtoService = {
    criarProduto,
};