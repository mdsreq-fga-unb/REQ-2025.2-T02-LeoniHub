import { Router } from 'express';
import { pedidoController } from '../controllers/pedidoController.js';

const router = Router();

// Rota de Pedido 

// POST /api/pedidos/:lojaId (Criar Pedido)
router.post('/:lojaId', pedidoController.createPedido);

export default router;