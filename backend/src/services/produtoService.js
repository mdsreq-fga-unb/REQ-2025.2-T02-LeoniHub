import {supabaseSchema } from '../config/db.js'

async function criarProduto(produtoData) {

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

async function atualizarProduto(codigo, produtoData) {

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

async function removerProduto( codigo ) {

    // Verificar o estoque atual do produto
    const { data: produtoAtualQuantidade, error: erroBuscaQuantidade } = await supabaseSchema
    .from('produtos')
    .select('quantidade')
    .eq('codigo', codigo)
    .single();

    // Se não encontrar o produto, erroBusca não será nulo
    if (erroBuscaQuantidade) {
        throw new Error('Produto não encontrado para remoção.');
    }

     // Se o produto existe no estoque, não pode ser removido
    if (produtoAtualQuantidade.quantidade > 0) {
        throw new Error('Não é possível remover um produto que está no estoque');
    }

    // DELETA PRODUTO
    const { data: deletedData, error: deleteError } = await supabaseSchema
        .from('produtos')
        .delete()
        .eq('codigo', codigo)
        .select()
        .single();

    if (deleteError) {
        console.error('Erro ao deletar produto:', deleteError.message);
        throw new Error(`Erro ao deletar o produto: ${deleteError.message}`);
    }

}

async function listarProdutos(query){

    // Seleciona TODOS os produtos
    let selectQuery = supabaseSchema.from('produtos').select()

    // Todos os filtros do produto
    
    if(query.codigo){
        selectQuery = selectQuery.ilike("codigo", `%${query.codigo}%`);
    }
    if(query.descricao){
        selectQuery = selectQuery.ilike("descricao", `%${query.descricao}%`);
    }

    if(query.tamanho){
        selectQuery =  selectQuery.ilike("tamanho", `%${query.tamanho}%`)
    }
    if(query.estado){
        selectQuery = selectQuery.ilike("estado", `%${query.estado}%`)
    }

   
    // --- Filtros de Quantidade com Operadores ---
    if (query.quantidade) {
        const value = String(query.quantidade);
        let numericValue;

        if (value.startsWith('>=')) {
            numericValue = parseFloat(value.substring(2)); 
            if (!isNaN(numericValue)) {
                selectQuery = selectQuery.gte("quantidade", numericValue);
            }
        } else if (value.startsWith('<=')) {
            numericValue = parseFloat(value.substring(2));
            if (!isNaN(numericValue)) {
                selectQuery = selectQuery.lte("quantidade", numericValue);
            }
        } else if (value.startsWith('>')) {
            numericValue = parseFloat(value.substring(1));
            if (!isNaN(numericValue)) {
                selectQuery = selectQuery.gt("quantidade", numericValue);
            }
        } else if (value.startsWith('<')) {
            numericValue = parseFloat(value.substring(1));
            if (!isNaN(numericValue)) {
                selectQuery = selectQuery.lt("quantidade", numericValue);
            }
        } else {
            // Se não tiver operador, é uma busca por igualdade
            numericValue = parseFloat(value);
            if (!isNaN(numericValue)) {
                selectQuery = selectQuery.eq("quantidade", numericValue);
            }
        }
    }

    const {data, error} = await selectQuery
    if(error){
        throw Error(error.message);
    }
    return data;
}

// Exportamos um objeto com todas as funções do model
export const produtoService = {
    criarProduto,
    atualizarProduto,
    removerProduto,
    listarProdutos
};