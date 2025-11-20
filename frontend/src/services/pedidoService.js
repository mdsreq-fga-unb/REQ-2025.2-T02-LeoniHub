import * as API from '../utils/helper'

export const criarPedido = (pedidoData) => {

    const serializedBody = JSON.stringify(pedidoData);
    console.log("Body Enviado:", serializedBody);
    
    return API.apiFetch(`pedidos/criarPedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( pedidoData ),
    });
}

export const listarPedidos = () => {
    return API.apiFetch(`pedidos/`, {
        method: 'GET',
    });
}