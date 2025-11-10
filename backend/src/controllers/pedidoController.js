import { pedidoModel } from '../models/pedido.js';
import { clienteModel } from '../models/cliente.js'; // Importamos o model de cliente
import { produtoModel } from '../models/produto.js'; // Importamos o model de produto

//  Controla a criação de um novo pedido.
async function createPedido(req, res) {
const { lojaId } = req.params;
const {
    codigo_cliente,
    codigo_produto,
    valor,
    data_aluguel,
    data_devolucao
} = req.body;

// CA1: Validação de todos os campos
if (!codigo_cliente || !codigo_produto || !valor || !data_aluguel || !data_devolucao) {
    return res.status(400).json({
    message: 'Todos os campos são obrigatórios: codigo_cliente, codigo_produto, valor, data_aluguel, data_devolucao.'
    });
}

try {
    // 1. CA3: Verificar se o cliente existe
    const cliente = await clienteModel.getByCodigo(lojaId, codigo_cliente);

    // 2. Verificar se o produto existe
    const produto = await produtoModel.getByCodigo(lojaId, codigo_produto);

    // 3. Checar disponibilidade de datas
    const estaDisponivel = await pedidoModel.checkAvailability(
    lojaId,
    produto.id,       // ID do produto
    data_aluguel,     // Data de início
    data_devolucao,   // Data de fim
    null              // ID a excluir (null, pois é um NOVO pedido)
    );

    if (!estaDisponivel) {
    return res.status(409).json({
        message: 'Conflito de datas. O produto já está reservado para este período.'
    });
    }
    // 4. Montar o objeto de dados para o novo pedido
    const pedidoData = {
    client_id: cliente.id,
    produto_id: produto.id,
    valor,
    data_aluguel,
    data_devolucao,
    status: 'ativo'
    };

    // 5. Criar o Pedido
    const novoPedido = await pedidoModel.create(lojaId, pedidoData);

    // 6. REMOVEMOS a atualização de estado do produto.
    // O "estado" de um produto é dinâmico, baseado nas reservas.
    // A linha "await produtoModel.update(...)" FOI REMOVIDA.

    // 7. Retornar o pedido criado
    return res.status(201).json(novoPedido);

} catch (error) {
    // Trata os erros "Não encontrado"
    if (error.message.includes('Cliente não encontrado')) {
    return res.status(404).json({ message: 'Cliente não encontrado. Verifique o código.' });
    }
    if (error.message.includes('Produto não encontrado')) {
    return res.status(404).json({ message: 'Produto não encontrado. Verifique o código.' });
    }
    if (error.message.includes('disponibilidade')) {
        return res.status(500).json({ message: error.message });
    }
    
    console.error('Erro no controller createPedido:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}


// Controla a busca por um pedido específico (pelo ID).
async function getPedidoById(req, res) {
try {
    const { lojaId, pedidoId } = req.params;
    const pedido = await pedidoModel.getById(lojaId, pedidoId);
    return res.status(200).json(pedido);
} catch (error) {
    if (error.message.includes('Pedido não encontrado')) {
    return res.status(404).json({ message: error.message });
    }
    console.error('Erro no controller getPedidoById:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

//Controla a atualização de um pedido.
async function updatePedido(req, res) {
try {
    const { lojaId, pedidoId } = req.params;
    const { valor, data_aluguel, data_devolucao, status } = req.body;

    // 1. Buscar o pedido original
    const pedidoAtual = await pedidoModel.getById(lojaId, pedidoId);

    // 2. Montar o objeto de dados para atualizar (com o que veio no body)
    const dadosParaAtualizar = {
    ...(valor !== undefined && { valor }),
    ...(data_aluguel !== undefined && { data_aluguel }),
    ...(data_devolucao !== undefined && { data_devolucao }),
    ...(status !== undefined && { status }),
    };

    // 3. (Bloqueio por Coleta)
    // Se o pedido NÃO estiver 'ativo'...
    if (pedidoAtual.status !== 'ativo') {
    
    // ...verificamos se o usuário está tentando mudar algo ALÉM do status.
    const estaMudandoApenasOStatus = (status !== undefined) && 
                                    (valor === undefined) && 
                                    (data_aluguel === undefined) && 
                                    (data_devolucao === undefined);

    // Se ele tentar mudar valor ou datas, nós bloqueamos.
    if (!estaMudandoApenasOStatus) {
        return res.status(403).json({
        message: `Não é possível editar dados (valor, datas) de um pedido com status "${pedidoAtual.status}". Apenas o status pode ser alterado.`
        });
    }
    // Se estiver mudando SÓ o status (ex: de 'coletado' para 'devolvido'), nós permitimos
    // e pulamos a checagem de datas.
    } 
    // Se o pedido ESTIVER 'ativo', checamos a Regra 1 (disponibilidade)
    else {
    // 4. (Checagem de Disponibilidade de Data)
    const mudandoDatas = (data_aluguel && data_aluguel !== pedidoAtual.data_aluguel) ||
                        (data_devolucao && data_devolucao !== pedidoAtual.data_devolucao);

    if (mudandoDatas) {
        const novaDataAluguel = data_aluguel || pedidoAtual.data_aluguel;
        const novaDataDevolucao = data_devolucao || pedidoAtual.data_devolucao;
        
        const estaDisponivel = await pedidoModel.checkAvailability(
        lojaId,
        pedidoAtual.produto_id,
        novaDataAluguel,
        novaDataDevolucao,
        pedidoId
        );

        if (!estaDisponivel) {
        return res.status(409).json({
            message: 'Conflito de datas. O produto já está reservado para este período.'
        });
        }
    }
    }

    // 5. Se passou em todas as regras, atualiza o pedido
    const pedidoAtualizado = await pedidoModel.update(lojaId, pedidoId, dadosParaAtualizar);

    return res.status(200).json(pedidoAtualizado);

} catch (error) {
    if (error.message.includes('Pedido não encontrado')) {
    return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('disponibilidade')) {
    return res.status(500).json({ message: error.message });
    }
    
    console.error('Erro no controller updatePedido:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

//Controla a busca por todos os pedidos (com filtros). (US06)

async function getAllPedidos(req, res) {
try {
    const { lojaId } = req.params;
    const {
    codigo_cliente,
    nome_cliente,
    codigo_produto,
    data_aluguel,
    status 
    } = req.query;

    // Monta o objeto de filtros
    const filters = {
    ...(codigo_cliente && { codigo_cliente }),
    ...(nome_cliente && { nome_cliente }),
    ...(codigo_produto && { codigo_produto }),
    ...(data_aluguel && { data_aluguel }),
    ...(status && { status }),
    };

    const pedidos = await pedidoModel.getAll(lojaId, filters);
    
    // Retorna os pedidos
    return res.status(200).json(pedidos);

} catch (error) {
    console.error('Erro no controller getAllPedidos:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}   
}

// Controla a "assinatura" de um pedido, atualizando seu status e salvando o link externo (US10).

async function assinarPedido(req, res) {
try {
    const { lojaId, pedidoId } = req.params;
    // O frontend enviará UMA destas duas chaves
    const { link_assinatura_externa, assinatura_base64 } = req.body;

    // Validamos se pelo menos UMA forma de assinatura foi enviada
    if (!link_assinatura_externa && !assinatura_base64) {
    return res.status(400).json({
        message: 'Nenhum método de assinatura foi fornecido (link externo ou assinatura digital).'
    });
    }
    // Verifica se o pedido existe
    await pedidoModel.getById(lojaId, pedidoId);

    // Monta o objeto de dados com o que veio
    const dadosParaAtualizar = {
    status_assinatura: 'assinado',
    // Adiciona o link OU a assinatura, o que tiver sido enviado
    ...(link_assinatura_externa && { link_assinatura_externa }),
    ...(assinatura_base64 && { assinatura_base64 }),
    };

    // Reutilizamos a função 'update'
    const pedidoAtualizado = await pedidoModel.update(lojaId, pedidoId, dadosParaAtualizar);

    // O frontend verá este 200 OK e mostrará a mensagem de sucesso
    return res.status(200).json(pedidoAtualizado);

} catch (error) {
    if (error.message.includes('Pedido não encontrado')) {
    return res.status(404).json({ message: error.message });
    }
    
    console.error('Erro no controller assinarPedido:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

export const pedidoController = {
createPedido,
getAllPedidos,
getPedidoById,
updatePedido,
assinarPedido,
};