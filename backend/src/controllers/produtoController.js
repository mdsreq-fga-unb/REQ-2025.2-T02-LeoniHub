import * as produtoService from '../services/produtoService.js';

// Listar todos os produtos
export const getAllProdutos = async (req, res) => {
  try {
    const data = await produtoService.getAllProdutos();
    return res.status(200).json({ 
      success: true, 
      data 
    });
  } catch (error) {
    console.error('Erro no getAllProdutos:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Erro interno do servidor' 
    });
  }
};

// Buscar produto por ID
export const getProdutoById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await produtoService.getProdutoById(id);
    
    return res.status(200).json({ 
      success: true, 
      data 
    });
  } catch (error) {
    console.error('Erro no getProdutoById:', error);
    
    if (error.message === 'Produto não encontrado') {
      return res.status(404).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Erro interno do servidor' 
    });
  }
};

// Criar novo produto
export const createProduto = async (req, res) => {
  try {
    const data = await produtoService.createProduto(req.body);
    
    return res.status(201).json({ 
      success: true, 
      data,
      message: 'Produto criado com sucesso' 
    });
  } catch (error) {
    console.error('Erro no createProduto:', error);
    
    const statusCode = error.message.includes('obrigatórios') || 
                       error.message.includes('já existe') ? 400 : 500;
    
    return res.status(statusCode).json({ 
      success: false, 
      error: error.message || 'Erro interno do servidor' 
    });
  }
};

// Atualizar produto
export const updateProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await produtoService.updateProduto(id, req.body);
    
    return res.status(200).json({ 
      success: true, 
      data,
      message: 'Produto atualizado com sucesso' 
    });
  } catch (error) {
    console.error('Erro no updateProduto:', error);
    
    let statusCode = 500;
    if (error.message === 'Produto não encontrado') {
      statusCode = 404;
    } else if (error.message.includes('obrigatórios') || 
               error.message.includes('já está sendo usado')) {
      statusCode = 400;
    }
    
    return res.status(statusCode).json({ 
      success: false, 
      error: error.message || 'Erro interno do servidor' 
    });
  }
};

// Deletar produto
export const deleteProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await produtoService.deleteProduto(id);
    
    return res.status(200).json({ 
      success: true, 
      data,
      message: 'Produto deletado com sucesso' 
    });
  } catch (error) {
    console.error('Erro no deleteProduto:', error);
    
    if (error.message === 'Produto não encontrado') {
      return res.status(404).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Erro interno do servidor' 
    });
  }
};

// Atualizar quantidade
export const updateQuantidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;
    
    if (quantidade === undefined || quantidade === null) {
      return res.status(400).json({ 
        success: false, 
        error: 'Quantidade é obrigatória' 
      });
    }
    
    const data = await produtoService.updateQuantidade(id, quantidade);
    
    return res.status(200).json({ 
      success: true, 
      data,
      message: 'Quantidade atualizada com sucesso' 
    });
  } catch (error) {
    console.error('Erro no updateQuantidade:', error);
    
    if (error.message === 'Produto não encontrado') {
      return res.status(404).json({ 
        success: false, 
        error: error.message 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Erro interno do servidor' 
    });
  }
};
