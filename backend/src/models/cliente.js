    import { getSupabaseClient } from '../config/db.js';

    /**
     * Cria um novo cliente no banco de dados da loja especificada.
     * @param {string} lojaId - O ID da loja ('1' ou '2').
     * @param {object} clienteData - Dados do cliente { codigo, nome, telefone, email }.
     * @returns {object} O cliente que foi criado.
     */
    async function create(lojaId, clienteData) {
    const supabase = getSupabaseClient(lojaId);

    // 1. Verifica se já existe um cliente com o mesmo código
    const { data: clienteExistente, error: erroBusca } = await supabase
        .from('clientes')
        .select('codigo')
        .eq('codigo', clienteData.codigo)
        .single();

    if (clienteExistente && !erroBusca) {
        throw new Error('Já existe um cliente cadastrado com este código.');
    }

    // 2. Se o código estiver disponível, cadastra o novo cliente
    const { data, error } = await supabase
        .from('clientes')
        .insert([clienteData])
        .select()
        .single();

    if (error) {
        console.error('Erro ao cadastrar cliente:', error.message);
        throw new Error('Não foi possível cadastrar o cliente no banco de dados.');
    }

    return data;
    }

    /**
     * Busca todos os clientes da loja, com filtros opcionais.
     * @param {string} lojaId - O ID da loja ('1' ou '2').
     * @param {object} filters - Objeto com filtros { codigo, nome }.
     * @returns {Array} Lista de clientes.
     */
    async function getAll(lojaId, filters = {}) {
    const supabase = getSupabaseClient(lojaId);

    let query = supabase.from('clientes').select('*');

    // Aplica filtros (usando 'ilike' para busca textual "case-insensitive")
    if (filters.codigo) {
        query = query.ilike('codigo', `%${filters.codigo}%`);
    }
    if (filters.nome) {
        query = query.ilike('nome', `%${filters.nome}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Erro ao buscar todos os clientes:', error.message);
        throw new Error('Não foi possível buscar os clientes.');
    }

    return data;
    }

    /**
     * Busca um único cliente pelo seu código.
     * @param {string} lojaId - O ID da loja ('1' ou '2').
     * @param {string} codigo - O código do cliente.
     * @returns {object} O cliente encontrado.
     */
    async function getByCodigo(lojaId, codigo) {
    const supabase = getSupabaseClient(lojaId);

    const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('codigo', codigo)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // Erro "0 rows"
        throw new Error('Cliente não encontrado.');
        }
        console.error('Erro ao buscar cliente por código:', error.message);
        throw new Error('Não foi possível buscar o cliente.');
    }

    return data;
    }


    // Exportamos as funções
    export const clienteModel = {
    create,
    getAll,
    getByCodigo,
};