import * as API from '../utils/helper';


const BASE_URL = 'http://localhost:3001';

// Listar todos os produtos
export const getAllProdutos = () => {
  return API.apiFetch('produto/', {
    method: 'GET',
  });
};

// Buscar produto por ID
export const getProdutoById = (id) => {
  return API.apiFetch(`produto/${id}`, {
    method: 'GET',
  });
};


// Criar Produto
export const createProduto = async (produtoData) => {
  if (produtoData instanceof FormData) {
    
    const token = localStorage.getItem('token'); // Autenticação 
    
    const response = await fetch(`${BASE_URL}/produto/novo`, { // Fetch nativo por causa dos headers (Estava dando conflito)
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: produtoData
    });

    const data = await response.json();
    
    if (!response.ok) {
        return { success: false, error: data.error || 'Erro na requisição' };
    }
    
    return { success: true, data: data.data };
  }

  // Caso não tenha foto -> Faz do jeito original
  return API.apiFetch('produto/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produtoData),
  });
};


// Atualizar produto
export const updateProduto = async (id, produtoData) => {

  if (produtoData instanceof FormData) {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${BASE_URL}/produto/${id}`, {
      method: 'PUT',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: produtoData
    });

    const data = await response.json();
    
    if (!response.ok) {
        return { success: false, error: data.error || 'Erro na requisição' };
    }
    
    return { success: true, data: data.data };
  }

  // Caso não tenha foto -> Faz do jeito original
  return API.apiFetch(`produto/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produtoData),
  });
};

// Deletar produto
export const deleteProduto = (id) => {
  return API.apiFetch(`produto/${id}`, {
    method: 'DELETE',
  });
};

// Atualizar quantidade do produto
export const updateQuantidade = (id, quantidade) => {
  return API.apiFetch(`produto/${id}/quantidade`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantidade }),
  });
};
