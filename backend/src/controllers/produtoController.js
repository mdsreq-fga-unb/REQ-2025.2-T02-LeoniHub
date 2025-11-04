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

// Exportamos um objeto com todas as funções do controller
export const produtoController = {
createProduto,
// (aqui entrarão outras funções: getProdutoById, updateProduto, etc.)
};