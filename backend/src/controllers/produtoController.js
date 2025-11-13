import { produtoService } from '../services/produtoService.js';

export const criarProduto = async (req, res) => {

    try {

        const { codigo, tamanho, estado, descricao, fotos } = req.body;
        const { lojaId } = req.params;

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
            ...(fotos && { fotos }), // Adiciona 'fotos' ao objeto apenas se não for nulo/undefined
        };

        // Chama o Service para criar o produto no banco
        const novoProduto = await produtoService.criarProduto(lojaId, produtoData);

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