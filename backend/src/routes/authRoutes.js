import express from 'express';
import { 
  login, 
  signup, 
  logout, 
  getSession, 
  getMe 
} from '../controllers/authController.js';

const router = express.Router();

// Rotas de autenticação
router.post('/:lojaId/login', login);
router.post('/:lojaId/signup', signup);
router.post('/:lojaId/logout', logout);
router.get('/:lojaId/session', getSession);
router.get('/:lojaId/me', getMe);

export default router;
