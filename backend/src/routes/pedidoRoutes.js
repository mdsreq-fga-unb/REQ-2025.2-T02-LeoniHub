import express from 'express';
import  PedidoController from '../controllers/pedidoController.js';

const controller = new PedidoController();

const router = express.Router();

/*  ROTA -- CRIAR PEDIDO
Campos Necessários:
    "cliente_codigo or cliente_cpf"
    "valor"
    "data_aluguel"
    "data_devolucao"
    "status"
    "status_assinatura"
    "assinatura_base64"
    "link_assinatura_externa"
    "produto_id"
*/

router.post('/criarPedido', controller.criarPedido);

/* ROTA -- ATUALIZAR PEDIDO
Campos Necessários:
    'id'
    optional fields(fields passed will be the ones updated in the DB):
    valor
    data_devolucao
    status
    status_assinatura
    assinatura_base64
    link_assinatura_externa
    produto_id
    data_aluguel
*/

router.post('/atualizarPedido', controller.atualizarPedido);

/* COMPORTAMENTO DA ROTA DE LISTAR PEDIDOS -- CONSULTAR
    SEM query param(/pedido): returns all
    produto_id (/pedido?produto_id=x) : returns all with produto_id = x
    cliente_id (/pedido?cliente_id=x) : returns all with cliente_id = x
    id (/pedido?id=x) : returns all with id = x
    query params can be stacked e.g : pedido?produto_id=x&cliente_id=y returns all entries with cliente_id=y and produto_id=x
*/

router.get("", controller.listarPedidos);

export default router;
