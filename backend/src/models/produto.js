import { getSupabaseClient } from '../config/db.js';


//FUNÇÃO 1: Criar Produto

/**
 * Cria um novo produto no banco de dados da loja especificada.
 * @param {string} lojaId - O ID da loja ('1' ou '2').
 * @param {object} produtoData - Dados do produto { codigo, tamanho, estado, descricao, fotos }.
 * @returns {object} O produto que foi criado.
 */
async function create(lojaId, produtoData) {
const supabase = getSupabaseClient(lojaId);

// 1. Verifica se já existe um produto com o mesmo código
const { data: produtoExistente, error: erroBusca } = await supabase
.from('produtos') // Assumindo que a tabela se chama 'produtos'
.select('codigo')
.eq('codigo', produtoData.codigo)
.single(); // .single() espera 0 ou 1 resultado. Se achar mais, dá erro.

// Se erroBusca for nulo E produtoExistente não for nulo, o código já existe
if (produtoExistente && !erroBusca) {
throw new Error('Já existe um produto cadastrado com este código.');
}

// 2. Se o código estiver disponível, cadastra o novo produto
const { data, error } = await supabase
.from('produtos')
.insert([produtoData])
.select() // .select() faz o Supabase retornar o objeto que acabou de ser inserido
.single(); // Esperamos que ele retorne apenas o objeto que inserimos

if (error) {
console.error('Erro ao cadastrar produto:', error.message);
throw new Error('Não foi possível cadastrar o produto no banco de dados.');
}

return data; // Retorna o produto recém-criado
}


//FUNÇÃO 2: Atualizar Produto 

/**
 * Atualiza um produto no banco de dados da loja especificada.
 * @param {string} lojaId - O ID da loja ('1' ou '2').
 * @param {string} codigo - O código do produto a ser atualizado.
 * @param {object} produtoData - Dados do produto a serem atualizados { tamanho, estado, descricao, fotos }.
 * @returns {object} O produto que foi atualizado.
 */
async function update(lojaId, codigo, produtoData) {
    const supabase = getSupabaseClient(lojaId);

  // Verificar o estado atual do produto
    const { data: produtoAtual, error: erroBusca } = await supabase
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
    const { data, error } = await supabase
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

 // FUNÇÃO 3: Buscar Todos os Produtos (com filtros)
    /**
     * Busca todos os produtos da loja, com filtros opcionais.
     * @param {string} lojaId - O ID da loja ('1' ou '2').
     * @param {object} filters - Objeto com filtros { codigo, tamanho, estado }.
     * @returns {Array} Lista de produtos.
     */
    async function getAll(lojaId, filters = {}) {
    const supabase = getSupabaseClient(lojaId);

    // Inicia a query básica
    let query = supabase.from('produtos').select('*');

    //Aplica filtros se eles existirem
    if (filters.codigo) {
        // Usamos 'ilike' para busca textual "case-insensitive" (ignora maiúsculas/minúsculas)
        // e com '%' para "contém"
        query = query.ilike('codigo', `%${filters.codigo}%`);
    }
    if (filters.tamanho) {
        query = query.eq('tamanho', filters.tamanho);
    }
    if (filters.estado) {
        query = query.eq('estado', filters.estado);
    }

    // Executa a query
    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar todos os produtos:', error.message);
        throw new Error('Não foi possível buscar os produtos.');
    }

    return data;
    }

    // FUNÇÃO 4: Buscar Um Produto por Código 

    /**
     * Busca um único produto pelo seu código.
     * @param {string} lojaId - O ID da loja ('1' ou '2').
     * @param {string} codigo - O código do produto.
     * @returns {object} O produto encontrado.
     */
    async function getByCodigo(lojaId, codigo) {
    const supabase = getSupabaseClient(lojaId);

    const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('codigo', codigo)
        .single(); // Espera exatamente 1 resultado

    if (error) {
        // Se o 'error' for do tipo "PGRST116" (PostgREST), significa que não achou (0 rows)
        if (error.code === 'PGRST116') {
        throw new Error('Produto não encontrado.');
        }
        console.error('Erro ao buscar produto por código:', error.message);
        throw new Error('Não foi possível buscar o produto.');
    }

    return data;
    }

// Exportamos um objeto com todas as funções do model
export const produtoModel = {
create,
update,
getAll,
getByCodigo,
// (aqui entrarão outras funções, como getById, update, delete, etc.)
};