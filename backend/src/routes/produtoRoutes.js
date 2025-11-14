import express from 'express';

import { 
  criarProduto,
  atualizarProduto,
} from '../controllers/produtoController.js';

const router = express.Router();

// Rotas de Produto -- POST
router.post('/criarProduto', criarProduto);
router.post('/atualizarProduto/:codigo', atualizarProduto);

export default router;
