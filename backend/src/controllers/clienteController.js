import { clienteModel } from '../models/cliente.js';

import CpfCnpjValidator from 'cpf-cnpj-validator';


const { cpf, cnpj } = CpfCnpjValidator;


/**
 * Função auxiliar para validar telefone (padrão brasileiro simples)
 * (ex: 11988887777 ou 6133334444)
 */
function validarTelefone(telefone) {
const regex = /^[0-9]{10,11}$/; // Aceita 10 (fixo) ou 11 (móvel) dígitos
return regex.test(telefone);
}
// Controla a criação de um novo cliente (US07)
async function createCliente(req, res) {
try {
    const { lojaId } = req.params;
    const {
    nome,
    cpf_cnpj,
    telefone,
    cep,
    estado,
    cidade,
    endereco
    } = req.body;

    // Validação dos 7 campos obrigatórios
    if (!nome || !cpf_cnpj || !telefone || !cep || !estado || !cidade || !endereco) {
    return res.status(400).json({
        message: 'Campos obrigatórios não preenchidos. Todos os 7 campos são necessários.'
    });
    }

    // Validação de Formato (CPF/CNPJ)
    const cpfCnpjLimpo = cpf_cnpj.replace(/[^\d]/g, '');

    // DEPURANDO VALIDAÇÃO (PODE MANTER OU REMOVER)
    console.log('--- DEPURANDO VALIDAÇÃO ---');
    console.log('CPF/CNPJ Limpo Recebido:', cpfCnpjLimpo);
    console.log('cpf.isValid?', cpf.isValid(cpfCnpjLimpo));
    console.log('cnpj.isValid?', cnpj.isValid(cpfCnpjLimpo));

    // Se não for um CPF válido E não for um CNPJ válido, bloqueia.
    if (!cpf.isValid(cpfCnpjLimpo) && !cnpj.isValid(cpfCnpjLimpo)) {
    return res.status(400).json({
        message: 'CPF ou CNPJ inválido. Verifique o formato e os dígitos.'
    });
    }

    // Validação de Formato (Telefone)
    const telefoneLimpo = telefone.replace(/[^\d]/g, '');
    if (!validarTelefone(telefoneLimpo)) {
    return res.status(400).json({
        message: 'Telefone inválido. Use apenas números, com DDD (10 ou 11 dígitos).'
    });
    }

    // Monta o objeto de dados
    const clienteData = {
    nome,
    cpf_cnpj: cpfCnpjLimpo,
    telefone: telefoneLimpo,
    cep,
    estado,
    cidade,
    endereco,
    };

    const novoCliente = await clienteModel.create(lojaId, clienteData);

    // Mensagem de sucesso
    return res.status(201).json({
    message: 'Cadastro realizado com sucesso!',
    cliente: novoCliente
    });

} catch (error) {
    // Mensagem de duplicata
    if (error.message.includes('Cliente já cadastrado')) {
    return res.status(409).json({ message: error.message });
    }
    
    console.error('Erro no controller createCliente:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

// Controla a busca por todos os clientes (com filtros).
async function getAllClientes(req, res) {
try {
    const { lojaId } = req.params;
    
    // Capturar filtros da query string (URL)
    const { cpf_cnpj, nome, estado, cidade } = req.query;
    
    const filters = {
    ...(cpf_cnpj && { cpf_cnpj }),
    ...(nome && { nome }),
    ...(estado && { estado }),     // <-- ADIÇÃO DA US08
    ...(cidade && { cidade }),     // <-- ADIÇÃO DA US08
    };

    const clientes = await clienteModel.getAll(lojaId, filters);
    return res.status(200).json(clientes);

} catch (error) {
    console.error('Erro no controller getAllClientes:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

// Controla a busca por um cliente específico (pelo CPF/CNPJ).
async function getClientePorCpfCnpj(req, res) {
try {
    const { lojaId, cpfCnpj } = req.params; // A rota será /:lojaId/:cpfCnpj
    const cliente = await clienteModel.getByCpfCnpj(lojaId, cpfCnpj);
    return res.status(200).json(cliente);

} catch (error) {
    if (error.message.includes('Cliente não encontrado')) {
    return res.status(404).json({ message: error.message });
    }
    console.error('Erro no controller getClientePorCpfCnpj:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

export const clienteController = {
createCliente,
getAllClientes,
getClientePorCpfCnpj,
};