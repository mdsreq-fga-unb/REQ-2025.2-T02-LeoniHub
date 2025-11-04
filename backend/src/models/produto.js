import { getSupabaseClient } from '../config/db.js';

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

// Exportamos um objeto com todas as funções do model
export const produtoModel = {
create,
// (aqui entrarão outras funções, como getById, update, delete, etc.)
};