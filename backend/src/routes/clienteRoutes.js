import { Router } from 'express';
import { clienteController } from '../controllers/clienteController.js';

const router = Router();

// Rotas de Cliente 

// POST /api/clientes/:lojaId (Criar Cliente)
router.post('/:lojaId', clienteController.createCliente);

// GET /api/clientes/:lojaId (Buscar Todos os Clientes com filtros)
router.get('/:lojaId', clienteController.getAllClientes);

// GET /api/clientes/:lojaId/:codigo (Buscar Cliente Específico)
router.get('/:lojaId/:codigo', clienteController.getClientePorCodigo);

export default router;