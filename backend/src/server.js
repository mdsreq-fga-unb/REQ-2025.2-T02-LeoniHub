import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Log de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rota de teste/health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'API LeoniHub funcionando!',
    version: '1.0.0',
    lojas: ['ClosetChic', 'Leonni'],
    timestamp: new Date().toISOString()
  });
});

// Rotas da API
app.use('/auth', authRoutes);
app.use('/produto', produtoRoutes);

// Rota 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Rota não encontrada' 
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Erro interno do servidor' 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
