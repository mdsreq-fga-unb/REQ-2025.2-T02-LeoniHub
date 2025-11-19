import express from 'express';
import { 
  login, 
  signup, 
  logout, 
  forgotPassword,
  changePassword,
  getSession, 
  getMe 
} from '../controllers/authController.js';

const router = express.Router();

// Rotas de autenticação
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);
router.get('/session', getSession);
router.get('/me', getMe);

export default router;
