import { produtoModel } from '../models/produto.js';

async function createProduto(req, res) {
try {
// 1. Pega o lojaId (Ex: da URL /produtos/1)
const { lojaId } = req.params;

// 2. Pega os dados do produto do corpo da requisição
const { codigo, tamanho, estado, descricao, fotos } = req.body;

// 3. Valida os campos obrigatórios
if (!codigo || !tamanho || !estado || !descricao) {
    return res.status(400).json({ 
    message: 'Campos obrigatórios não preenchidos. É necessário: código, tamanho, estado e descrição.' 
    });
}

// 4. Monta o objeto de dados
// O campo 'fotos' é opcional, então o incluímos se ele existir
const produtoData = {
    codigo,
    tamanho,
    estado,
    descricao,
    ...(fotos && { fotos }), // Adiciona 'fotos' ao objeto apenas se não for nulo/undefined
};

// 5. Chama o Model para criar o produto no banco
const novoProduto = await produtoModel.create(lojaId, produtoData);

// 6. Retorna o produto criado como resposta
// 201 Created - Padrão REST para criação bem-sucedida
return res.status(201).json(novoProduto);

} catch (error) {
// 7. Tratamento de erros

// Se for o erro específico de código duplicado que definimos no Model
if (error.message.includes('Já existe um produto')) {
    // 409 Conflict - Padrão REST para conflito de recurso (recurso já existe)
    return res.status(409).json({ message: error.message });
}

// Para outros erros (ex: falha de conexão com o Supabase)
console.error('Erro no controller createProduto:', error);
return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

// Controla a atualização de um produto.
async function updateProduto(req, res) {
try {
    // O :codigo vem da URL (ex: /api/produtos/1/SKU-001)
    const { lojaId, codigo } = req.params;
    const { tamanho, estado, descricao, fotos } = req.body;

    // Se o 'codigo' vier no body, é um erro 400.
    if (req.body.codigo) {
    return res.status(400).json({ 
        message: 'O código do produto não pode ser editado.' 
    });
    }

    // Montamos o objeto APENAS com os campos que podem ser atualizados
    // e que foram enviados na requisição
    const dadosParaAtualizar = {
    ...(tamanho !== undefined && { tamanho }),
    ...(estado !== undefined && { estado }),
    ...(descricao !== undefined && { descricao }),
    ...(fotos !== undefined && { fotos }),
    };

    // Validação para garantir que pelo menos um campo foi enviado
    if (Object.keys(dadosParaAtualizar).length === 0) {
    return res.status(400).json({
        message: 'Nenhum dado válido para atualização foi fornecido.'
    });
    }

    // Chama o Model para atualizar o produto
    const produtoAtualizado = await produtoModel.update(lojaId, codigo, dadosParaAtualizar);

    // 200 OK - Padrão REST para atualização bem-sucedida
    return res.status(200).json(produtoAtualizado);

} catch (error) {
    // Tratamento de erros do Model

    if (error.message.includes('emprestado')) {
    // 403 Forbidden - Ação proibida pela regra de negócio
    return res.status(403).json({ message: error.message });
    }

    if (error.message.includes('Produto não encontrado')) {
    // 404 Not Found - O recurso (produto) não existe
    return res.status(404).json({ message: error.message });
    }

    console.error('Erro no controller updateProduto:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
}
}

// Exportamos um objeto com todas as funções do controller
export const produtoController = {
createProduto,
updateProduto,
// (aqui entrarão outras funções: getProdutoById, updateProduto, etc.)
};