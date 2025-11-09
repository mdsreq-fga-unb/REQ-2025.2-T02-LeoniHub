import { Router } from 'express';
import { pedidoController } from '../controllers/pedidoController.js';

const router = Router();

// Rota de Pedido 

// POST /api/pedidos/:lojaId (Criar Pedido)
router.post('/:lojaId', pedidoController.createPedido);

// GET /api/pedidos/:lojaId (Buscar Todos os Pedidos) - US05 (Dependência)
router.get('/:lojaId', pedidoController.getAllPedidos); 

// GET /api/pedidos/:lojaId/:pedidoId (Buscar Pedido Específico) - US05 (Dependência)
router.get('/:lojaId/:pedidoId', pedidoController.getPedidoById); 

// PATCH (Atualizar) - US05
router.patch('/:lojaId/:pedidoId', pedidoController.updatePedido);

export default router;