import { clienteModel } from '../models/cliente.js';

// Controla a criação de um novo cliente.

async function createCliente(req, res) {
try {
    const { lojaId } = req.params;
    const { codigo, nome, telefone, email } = req.body;

    // Validação dos campos obrigatórios
    if (!codigo || !nome || !telefone) {
    return res.status(400).json({ 
        message: 'Campos obrigatórios não preenchidos. É necessário: código, nome e telefone.' 
    });
    }

    const clienteData = {
    codigo,
    nome,
    telefone,
    ...(email && { email }), // Adiciona email apenas se existir
    };

    const novoCliente = await clienteModel.create(lojaId, clienteData);
    return res.status(201).json(novoCliente);

} catch (error) {
    if (error.message.includes('Já existe um cliente')) {
    return res.status(409).json({ message: error.message });
    }
    console.error('Erro no controller createCliente:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

// Controla a busca por todos os clientes (com filtros)
async function getAllClientes(req, res) {
try {
    const { lojaId } = req.params;
    const { codigo, nome } = req.query; // Filtros da URL
    
    const filters = {
    ...(codigo && { codigo }),
    ...(nome && { nome }),
    };

    const clientes = await clienteModel.getAll(lojaId, filters);
    return res.status(200).json(clientes);

} catch (error) {
    console.error('Erro no controller getAllClientes:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

// Controla a busca por um cliente específico (pelo código)
async function getClientePorCodigo(req, res) {
try {
    const { lojaId, codigo } = req.params;
    const cliente = await clienteModel.getByCodigo(lojaId, codigo);
    return res.status(200).json(cliente);

} catch (error) {
    if (error.message.includes('Cliente não encontrado')) {
    return res.status(404).json({ message: error.message });
    }
    console.error('Erro no controller getClientePorCodigo:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

// Exportamos as funções
export const clienteController = {
createCliente,
getAllClientes,
getClientePorCodigo,
};