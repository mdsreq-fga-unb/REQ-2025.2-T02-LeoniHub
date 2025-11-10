import { getSupabaseClient } from '../config/db.js';

/**
 * Cria um novo cliente (US07).
 * (Função corrigida para checar duplicatas de forma mais robusta)
 * @param {string} lojaId - O ID da loja ('1' ou '2').
 * @param {object} clienteData - Dados do cliente { nome, cpf_cnpj, telefone, cep, ... }.
 * @returns {object} O cliente que foi criado.
 */
async function create(lojaId, clienteData) {
const supabase = getSupabaseClient(lojaId);

// 1. Checa por CPF/CNPJ duplicado
const { data: cpfExistente } = await supabase
    .from('clientes')
    .select('cpf_cnpj')
    .eq('cpf_cnpj', clienteData.cpf_cnpj)
    .maybeSingle();

if (cpfExistente) {
    throw new Error('Cadastro cancelado. Cliente já cadastrado! (CPF/CNPJ duplicado)');
}

// 2. Checa por Nome duplicado
const { data: nomeExistente } = await supabase
    .from('clientes')
    .select('nome')
    .eq('nome', clienteData.nome)
    .maybeSingle();

if (nomeExistente) {
    throw new Error('Cadastro cancelado. Cliente já cadastrado! (Nome duplicado)');
}

// Se não houver duplicatas, cadastra o novo cliente
const { data, error } = await supabase
    .from('clientes')
    .insert([clienteData])
    .select()
    .single();

if (error) {
    console.error('Erro ao cadastrar cliente:', error.message);

    // Código '23505' é 'unique_violation' (ex: a constraint do Supabase pegou)
    if (error.code === '23505') {
    throw new Error('Cadastro cancelado. Cliente já cadastrado!');
    }
    throw new Error('Não foi possível cadastrar o cliente no banco de dados.');
}

return data;
}

/**
 * Busca todos os clientes da loja, com filtros opcionais. (US08)
 * @param {string} lojaId - O ID da loja ('1' ou '2').
 * @param {object} filters - Objeto com filtros { cpf_cnpj, nome, estado, cidade }.
 * @returns {Array} Lista de clientes.
 */
async function getAll(lojaId, filters = {}) {
const supabase = getSupabaseClient(lojaId);

let query = supabase.from('clientes').select('*');

// Aplicar filtros
if (filters.cpf_cnpj) {
    query = query.ilike('cpf_cnpj', `%${filters.cpf_cnpj}%`);
}
if (filters.nome) {
    query = query.ilike('nome', `%${filters.nome}%`);
}

if (filters.estado) {
    // .eq para correspondência exata (case-insensitive)
    query = query.ilike('estado', filters.estado);
}
if (filters.cidade) {
    query = query.ilike('cidade', `%${filters.cidade}%`);
}

const { data, error } = await query;

if (error) {
    console.error('Erro ao buscar todos os clientes:', error.message);
    throw new Error('Não foi possível buscar os clientes.');
}

return data;
}

/**
 * Busca um único cliente pelo seu CPF/CNPJ.
 * (Atualizamos a busca de 'codigo' para 'cpf_cnpj')
 * @param {string} lojaId - O ID da loja ('1' ou '2').
 * @param {string} cpfCnpj - O CPF/CNPJ do cliente.
 * @returns {object} O cliente encontrado.
 */
async function getByCpfCnpj(lojaId, cpfCnpj) {
const supabase = getSupabaseClient(lojaId);

const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('cpf_cnpj', cpfCnpj)
    .single();

if (error) {
    if (error.code === 'PGRST116') { // Erro "0 rows"
    throw new Error('Cliente não encontrado.');
    }
    console.error('Erro ao buscar cliente por CPF/CNPJ:', error.message);
    throw new Error('Não foi possível buscar o cliente.');
}

return data;
}

export const clienteModel = {
create,
getAll,
getByCpfCnpj,
};