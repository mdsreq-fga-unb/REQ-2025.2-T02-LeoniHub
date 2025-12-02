import { Router } from 'express';
import multer from 'multer';
import * as produtoController from '../controllers/produtoController.js';

const router = Router();

// Configura Multer (Extensão para armazenagem de fotos e arquivos)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Listar todos os produtos
router.get('/', produtoController.getAllProdutos);

// Buscar produto por ID
router.get('/:id', produtoController.getProdutoById);

// Criar/Atualizar produto com FOTO
router.post('/novo', upload.single('imagem'), produtoController.createProduto);
router.put('/:id', upload.single('imagem'), produtoController.updateProduto);

// Atualizar produto
router.put('/:id', produtoController.updateProduto);

// Atualizar quantidade do produto
router.patch('/:id/quantidade', produtoController.updateQuantidade);

// Deletar produto
router.delete('/:id', produtoController.deleteProduto);

export default router;
