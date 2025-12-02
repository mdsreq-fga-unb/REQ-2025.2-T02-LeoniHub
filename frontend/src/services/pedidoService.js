import * as API from '../utils/helper'

export const criarPedido = (pedidoData) => {
    return API.apiFetch(`pedidos/criarPedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( pedidoData ),
    });
}

export const getPedidoById = (pedidoId) => {
  return API.apiFetch(`pedidos/${pedidoId}` , { 
    method: 'GET',
    });
}

export const atualizarPedido = (pedidoData) => {
  return API.apiFetch(`pedidos/atualizarPedido`, { 
    method: 'PUT',
    body: JSON.stringify( pedidoData )
  });
}

export const listarPedidos = () => {
    return API.apiFetch(`pedidos/`, {
        method: 'GET',
    });
}

export const listarPedidosPorProduto = (produtoId) => {
    return API.apiFetch(`pedidos/produto/${produtoId}`, {
        method: 'GET',
    });
}