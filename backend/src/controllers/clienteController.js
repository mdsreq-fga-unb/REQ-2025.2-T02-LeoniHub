import * as clienteService from '../services/clienteService.js';

// Listar todos os clientes
export const getAllClientes = async (req, res) => {
  try {
    const data = await clienteService.getAllClientes();
    return res.status(200).json({ 
      success: true, 
      data 
    });
  } catch (error) {
    console.error('Erro no getAllClientes:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Erro interno do servidor' 
    });
  }
};

// Buscar cliente por ID
export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await clienteService.getClienteById(id);
    
    return res.status(200).json({ 
      success: true, 
      data 
    });
  } catch (error) {
    console.error('Erro no getClienteById:', error);
    
    if (error.message === 'Cliente não encontrado') {
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

// Criar novo cliente
export const createCliente = async (req, res) => {
  try {
    const data = await clienteService.createCliente(req.body);
    
    return res.status(201).json({ 
      success: true, 
      data,
      message: 'Cliente criado com sucesso' 
    });
  } catch (error) {
    console.error('Erro no createCliente:', error);
    
    const statusCode = error.message.includes('obrigatórios') || 
                       error.message.includes('já existe') ? 400 : 500;
    
    return res.status(statusCode).json({ 
      success: false, 
      error: error.message || 'Erro interno do servidor' 
    });
  }
};

// Atualizar cliente
export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await clienteService.updateCliente(id, req.body);
    
    return res.status(200).json({ 
      success: true, 
      data,
      message: 'Cliente atualizado com sucesso' 
    });
  } catch (error) {
    console.error('Erro no updateCliente:', error);
    
    let statusCode = 500;
    if (error.message === 'Cliente não encontrado') {
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

// Deletar cliente
export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    await clienteService.deleteCliente(id);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Cliente deletado com sucesso' 
    });
  } catch (error) {
    console.error('Erro no deleteCliente:', error);
    
    const statusCode = error.message === 'Cliente não encontrado' ? 404 : 500;
    
    return res.status(statusCode).json({ 
      success: false, 
      error: error.message || 'Erro interno do servidor' 
    });
  }
};
