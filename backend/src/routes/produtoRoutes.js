import { Router } from 'express';
// Importamos o controller que acabamos de criar
import { produtoController } from '../controllers/produtoController.js';

const router = Router();

// Definimos a rota para a criação de produtos
// Quando uma requisição POST chegar em /:lojaId, 
// ela será direcionada para a função createProduto no controller.
router.post('/:lojaId', produtoController.createProduto);
// Rota PATCH
// Ela espera o ID da loja e o CÓDIGO do produto na URL
router.patch('/:lojaId/:codigo', produtoController.updateProduto);
/* Aqui é onde você adicionará as outras rotas para produtos
quando formos implementar as outras US (como buscar, atualizar, deletar):

router.get('/:lojaId/:produtoCodigo', produtoController.getProdutoPorCodigo);
router.get('/:lojaId', produtoController.getTodosProdutos);
router.put('/:lojaId/:produtoCodigo', produtoController.updateProduto);
router.delete('/:lojaId/:produtoCodigo', produtoController.deleteProduto);
*/

// Exportamos o router
export default router;