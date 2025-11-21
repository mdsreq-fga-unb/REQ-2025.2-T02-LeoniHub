import { Router } from 'express';
import * as produtoController from '../controllers/produtoController.js';

const router = Router();

// Listar todos os produtos
router.get('/', produtoController.getAllProdutos);

// Buscar produto por ID
router.get('/:id', produtoController.getProdutoById);

// Criar novo produto
router.post('/', produtoController.createProduto);

// Atualizar produto
router.put('/:id', produtoController.updateProduto);

// Atualizar quantidade do produto
router.patch('/:id/quantidade', produtoController.updateQuantidade);

// Deletar produto
router.delete('/:id', produtoController.deleteProduto);

export default router;
