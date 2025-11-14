import * as API from '../utils/helper'

export const criarProduto = ( nome, estado, tamanho, descricao) => {
    return API.apiFetch(`produto/criarProduto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, estado, tamanho, descricao }),
    });
}