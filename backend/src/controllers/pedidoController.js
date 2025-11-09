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

// Validação de todos os campos
if (!codigo_cliente || !codigo_produto || !valor || !data_aluguel || !data_devolucao) {
    return res.status(400).json({
    message: 'Todos os campos são obrigatórios: codigo_cliente, codigo_produto, valor, data_aluguel, data_devolucao.'
    });
}

try {
    // 1. Verificar se o cliente existe (buscando pelo código)
    const cliente = await clienteModel.getByCodigo(lojaId, codigo_cliente);

    // 2. Verificar se o produto existe (buscando pelo código)
    const produto = await produtoModel.getByCodigo(lojaId, codigo_produto);

    // 3. Não alugar um produto que já está emprestado
    if (produto.estado === 'emprestado') {
    return res.status(409).json({
        message: 'Este produto já está emprestado e não pode ser alugado no momento.'
    });
    }

    // 4. Montar o objeto de dados para o novo pedido
    const pedidoData = {
    client_id: cliente.id,   // Usamos o ID (int8) real do cliente
    produto_id: produto.id,  // Usamos o ID (int8) real do produto
    valor,
    data_aluguel,
    data_devolucao,
    status: 'ativo'       // Status inicial do pedido
    };

    // 5. Criar o Pedido
    const novoPedido = await pedidoModel.create(lojaId, pedidoData);

    // 6. ATUALIZAR o status do produto para 'emprestado'
    await produtoModel.update(lojaId, produto.codigo, { estado: 'emprestado' });

    // 7. Retornar o pedido criado
    return res.status(201).json(novoPedido);

} catch (error) {
    // Trata os erros "Não encontrado" vindos dos models
    if (error.message.includes('Cliente não encontrado')) {
    return res.status(404).json({ message: 'Cliente não encontrado. Verifique o código.' });
    }
    if (error.message.includes('Produto não encontrado')) {
    return res.status(404).json({ message: 'Produto não encontrado. Verifique o código.' });
    }
    
    console.error('Erro no controller createPedido:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

export const pedidoController = {
createPedido,
};