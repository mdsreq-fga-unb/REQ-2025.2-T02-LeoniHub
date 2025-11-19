import express from 'express';

import { 
  criarProduto,
  atualizarProduto,
  removerProduto,
  listarProdutos,

} from '../controllers/produtoController.js';

const router = express.Router();

// Rotas de Produto -- POST
router.post('/criarProduto', criarProduto);
router.post('/atualizarProduto/:codigo', atualizarProduto);
router.post('/removerProduto/:codigo', removerProduto);

// Rotas de Produto -- GET
router.get('', listarProdutos);


export default router;
