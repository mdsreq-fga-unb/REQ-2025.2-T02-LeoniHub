import { produtoService } from '../services/produtoService.js';

export const criarProduto = async (req, res) => {

    try {

        const { codigo, tamanho, estado, descricao, quantidade, fotos } = req.body;

        // Verifica Campos Obrigatórios
        if (!codigo || !tamanho || !estado || !descricao) {
            return res.status(400).json({
                message: 'Campos obrigatórios não preenchidos. É necessário: código, tamanho, estado e descrição.' 
            });
        }

        const produtoData = { // Monta o Produto --> MODELO DO PRODUTO
            codigo,
            tamanho,
            estado,
            descricao,
            quantidade,
            ...(fotos && { fotos }), // Adiciona 'fotos' ao objeto apenas se não for nulo/undefined
        };

        // Chama o Service para criar o produto no banco
        const novoProduto = await produtoService.criarProduto(produtoData);

        return res.status(201).json(novoProduto);
    } 
    catch (error) {

        // Código Duplicado
        if (error.message.includes('Já existe um produto')) {
            return res.status(409).json({ message: error.message });
        }

        // Outros Erros
        return res.status(500).json({ message: `Erro no controller createProduto: ${error}` });
    }
}

export const atualizarProduto = async (req, res) => {
    
    try {
        const { codigo } = req.params;
        const { tamanho, estado, descricao, quantidade, fotos } = req.body;

        const dadosParaAtualizar = {
        ...(tamanho !== undefined && { tamanho }),
        ...(estado !== undefined && { estado }),
        ...(descricao !== undefined && { descricao }),
        ...(quantidade !== undefined && { quantidade }),
        ...(fotos !== undefined && { fotos }),
        };

        // Validação para garantir que pelo menos um campo foi enviado
        if (Object.keys(dadosParaAtualizar).length === 0) {
        return res.status(400).json({
            message: 'Nenhum dado válido para atualização foi fornecido.'
        });
        }

        // CHAMA SERVICE
        const produtoAtualizado = await produtoService.atualizarProduto(codigo, dadosParaAtualizar);

        return res.status(200).json(produtoAtualizado);
    } 
    catch (error) {

        if (error.message.includes('emprestado')) { 
            return res.status(403).json({ message: error.message });
        }

        if (error.message.includes('Produto não encontrado')) {
            return res.status(404).json({ message: error.message });
        }

        console.error('Erro no controller updateProduto:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

export const removerProduto = async (req, res) => {
    
    try {
        const { codigo } = req.params;

        // CHAMA SERVICE
        await produtoService.removerProduto(codigo);

        return res.status(200).json({ message: 'Produto removido com sucesso!' });
    } 
    catch (error) {

        if (error.message.includes('emprestado')) { 
            return res.status(403).json({ message: error.message });
        }

        if (error.message.includes('Produto não encontrado')) {
            return res.status(404).json({ message: error.message });
        }

        if (error.message === ('Não é possível remover um produto que está no estoque')) {
            return res.status(400).json({ message: error.message });
        }

        console.error('Erro no controller updateProduto:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

export const listarProdutos = async (req,res) => {
        try {
            return res.status(200).json( await produtoService.listarProdutos(req.query)).send()
        }
        catch (error) {
            return res.status(400).json({ error: error.message }).send();
        }

    }
