import * as API from '../utils/helper'

export const criarProduto = ( nome, estado, tamanho, descricao) => {
    return API.apiFetch(`produto/criarProduto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, estado, tamanho, descricao }),
    });
}

export const atualizarProduto = ( codigo, nome, estado, tamanho, descricao) => {
    return API.apiFetch(`produto/atualizarProduto/${codigo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, estado, tamanho, descricao }),
    });
}

export const removerProduto = ( codigo ) => {
    return API.apiFetch(`produto/removerProduto/${codigo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
    });
}

export const listarProdutos = () => {
    return API.apiFetch(`produto/`, {
        method: 'GET',
    });
}