import express, { Request, Response } from 'express';
// O Pool do PG será adicionado aqui depois

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Node.js Backend está funcionando com TypeScript e ESM!');
});

app.listen(PORT, () => {
  console.log(`🚀🚀🚀 Backend Server rodando em http://localhost:${PORT}`);
});