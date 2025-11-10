import { Router } from 'express';
import { clienteController } from '../controllers/clienteController.js';

const router = Router();

// --- Rotas de Clientes ---

// POST /api/clientes/:lojaId (Criar Cliente)
router.post('/:lojaId', clienteController.createCliente);

// GET /api/clientes/:lojaId (Buscar Todos os Clientes com filtros)
router.get('/:lojaId', clienteController.getAllClientes);

// GET /api/clientes/:lojaId/:cpfCnpj (Buscar Cliente Específico)
router.get('/:lojaId/:cpfCnpj', clienteController.getClientePorCpfCnpj);

export default router;