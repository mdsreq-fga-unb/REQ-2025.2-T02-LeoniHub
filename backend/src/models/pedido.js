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

export const pedidoModel = {
create,
};