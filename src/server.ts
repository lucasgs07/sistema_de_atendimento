import dotenv from 'dotenv';
// Carrega as variáveis do ficheiro .env antes de iniciar o app
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor a rodar na porta ${PORT}`);
  console.log(`🔗 Acede ao projeto em: http://localhost:${PORT}`);
});