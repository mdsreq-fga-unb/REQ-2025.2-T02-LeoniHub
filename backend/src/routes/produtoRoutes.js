import express from 'express';

import { 
  criarProduto,
} from '../controllers/produtoController.js';

const router = express.Router();

// Rotas de Produto -- POST
router.post('/:lojaId/produto/criarProduto', criarProduto);

export default router;
