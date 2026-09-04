const express = require('express');
const connectDB = require('./src/config/database');
const manutencaoRoutes = require('./src/routes/manutencaoRoutes');

const app = express();

// Conectar ao Banco de Dados
connectDB();

// Middlewares
app.use(express.json());
app.set('json spaces', 2); // Formatação amigável das respostas JSON

// Rotas
app.use('/api/v1/manutencoes', manutencaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
