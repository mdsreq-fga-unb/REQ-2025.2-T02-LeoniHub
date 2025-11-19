import * as API from '../utils/helper'

export const criarPedido = ( nome, estado, tamanho, descricao) => {
    return API.apiFetch(`pedido/criarPedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  }),
    });
}

export const listarPedidos = () => {
    return API.apiFetch(`pedido/`, {
        method: 'GET',
    });
}