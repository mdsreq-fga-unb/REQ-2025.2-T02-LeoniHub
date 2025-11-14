import express from 'express';

import { 
  criarProduto,
  atualizarProduto,
  removerProduto,

} from '../controllers/produtoController.js';

const router = express.Router();

// Rotas de Produto -- POST
router.post('/criarProduto', criarProduto);
router.post('/atualizarProduto/:codigo', atualizarProduto);
router.post('/removerProduto/:codigo', removerProduto);

export default router;
