import * as API from '../utils/helper';

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

// Criar novo produto
export const createProduto = (produtoData) => {
  return API.apiFetch('produto/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produtoData),
  });
};

// Atualizar produto
export const updateProduto = (id, produtoData) => {
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
