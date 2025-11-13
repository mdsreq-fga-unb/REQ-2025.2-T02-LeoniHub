import * as API from '../utils/helper'

export const criarProduto = (lojaId, nome, estado, tamanho, descricao) => {
    return API.apiFetch(`${lojaId}/produto/criarProduto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, estado, tamanho, descricao }),
    });
}