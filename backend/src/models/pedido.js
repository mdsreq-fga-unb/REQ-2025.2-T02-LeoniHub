import { getSupabaseClient } from '../config/db.js';

/**
 * Cria um novo pedido no banco de dados.
 * @param {string} lojaId - O ID da loja ('1' ou '2').
 * @param {object} pedidoData - Dados do pedido { client_id, produto_id, valor, data_aluguel, data_devolucao, status }
 * @returns {object} O pedido que foi criado.
 */
async function create(lojaId, pedidoData) {
const supabase = getSupabaseClient(lojaId);

const { data, error } = await supabase
    .from('pedidos')
    .insert([pedidoData])
    .select()
    .single();

if (error) {
    console.error('Erro ao cadastrar pedido:', error.message);
    // Erro 23503 é violação de Chave Estrangeira (FK)
    if (error.code === '23503') {
    throw new Error('Cliente ou Produto inválido.');
    }
    throw new Error('Não foi possível cadastrar o pedido no banco de dados.');
}

return data;
}



/**
 * Busca um único pedido pelo seu ID.
 * @param {string} lojaId - O ID da loja ('1' ou '2').
 * @param {number} pedidoId - O ID do pedido.
 * @returns {object} O pedido encontrado.
 */
async function getById(lojaId, pedidoId) {
const supabase = getSupabaseClient(lojaId);

const { data, error } = await supabase
    .from('pedidos')
    .select(`
    *,
    clientes (codigo, nome),
    produtos (codigo, descricao, estado)
    `)
    .eq('id', pedidoId)
    .single();

if (error) {
    if (error.code === 'PGRST116') { // Erro "0 rows"
    throw new Error('Pedido não encontrado.');
    }
    console.error('Erro ao buscar pedido por ID:', error.message);
    throw new Error('Não foi possível buscar o pedido.');
}

return data;
}

/**
 * Atualiza um pedido no banco de dados.
 * @param {string} lojaId - O ID da loja ('1' ou '2').
 * @param {number} pedidoId - O ID do pedido a ser atualizado.
 * @param {object} pedidoData - Dados a serem atualizados { valor, data_aluguel, data_devolucao, status }.
 * @returns {object} O pedido atualizado.
 */
async function update(lojaId, pedidoId, pedidoData) {
const supabase = getSupabaseClient(lojaId);

const { data, error } = await supabase
    .from('pedidos')
    .update(pedidoData)
    .eq('id', pedidoId)
    .select()
    .single();

if (error) {
    console.error('Erro ao atualizar pedido:', error.message);
    throw new Error('Não foi possível atualizar o pedido.');
}
return data;
}

/**
 * Verifica se um produto está disponível (não conflita com outros pedidos)
 * durante um período específico.
 * @param {string} lojaId - O ID da loja.
 * @param {number} produtoId - O ID do produto.
 * @param {string} startDate - Nova data de início (YYYY-MM-DD).
 * @param {string} endDate - Nova data de fim (YYYY-MM-DD).
 * @param {number | null} excludePedidoId - O ID do pedido que estamos editando (ou null se for um novo pedido).
 * @returns {boolean} True se disponível, False se houver conflito.
 */
async function checkAvailability(lojaId, produtoId, startDate, endDate, excludePedidoId = null) {
const supabase = getSupabaseClient(lojaId);

// Inicia a query base
let query = supabase
    .from('pedidos')
    .select('id')
    .eq('produto_id', produtoId)       // Do mesmo produto
    .eq('status', 'ativo')             // Que estejam ativos
    .lte('data_aluguel', endDate)      // Onde (StartA <= EndB)
    .gte('data_devolucao', startDate); // E (EndA >= StartB)

// Adiciona o filtro .neq APENAS se estivermos editando (excludePedidoId não é nulo)
if (excludePedidoId) {
    query = query.neq('id', excludePedidoId);
}

// Executa a query
const { data, error } = await query;

if (error) {
    console.error('Erro ao checar disponibilidade:', error.message);
    throw new Error('Erro ao checar disponibilidade de datas.');
}

// Se 'data' tiver 0 itens, não há conflitos. Está disponível.
return data.length === 0;
}

/**
 * Busca todos os pedidos da loja, com filtros. (Atualizado US09)
 * @param {string} lojaId - O ID da loja ('1' ou '2').
 * @param {object} filters - Objeto com filtros { ... }.
 * @returns {Array} Lista de pedidos.
 */
async function getAll(lojaId, filters = {}) {
const supabase = getSupabaseClient(lojaId);

//  FILTRO DE 1 ANO (US09) 
const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
const oneYearAgoISO = oneYearAgo.toISOString();

let query = supabase
    .from('pedidos')
    .select(`
    *,
    clientes!inner (codigo, nome),
    produtos!inner (codigo, descricao)
    `);

// Aplicar Filtro de Data (RN4) 
// gte = "greater than or equal to" (maior ou igual a)
query = query.gte('created_at', oneYearAgoISO);

// Aplicar Filtros da US06 
if (filters.data_aluguel) {
    query = query.eq('data_aluguel', filters.data_aluguel);
}
if (filters.status) {
    query = query.eq('status', filters.status);
}
if (filters.codigo_cliente) {
    // foi trocado para 'clientes.cpf_cnpj' para bater com a US07
    query = query.ilike('clientes.cpf_cnpj', `%${filters.codigo_cliente}%`);
}
if (filters.nome_cliente) {
    query = query.ilike('clientes.nome', `%${filters.nome_cliente}%`);
}
if (filters.codigo_produto) {
    query = query.ilike('produtos.codigo', `%${filters.codigo_produto}%`);
}

// Ordenar pelos mais recentes
query = query.order('created_at', { ascending: false });

// Executa a query
const { data, error } = await query;

if (error) {
    console.error('Erro ao buscar todos os pedidos:', error.message);
    throw new Error('Não foi possível buscar os pedidos.');
}

return data;
}

export const pedidoModel = {
create,
getAll,
getById,
update,
checkAvailability,
};