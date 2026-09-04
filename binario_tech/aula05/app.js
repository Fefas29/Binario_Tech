const express = require('express');
const cors = require('cors');

const loggerMiddleware = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');

const motoristasRouter = require('./routes/motoristas');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();

const PORT = 3000;


// Middlewares Globais
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);


// Rota Pública - Health Check
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: "ONLINE",
        aplicacao: "Binario Tech API v2"
    });
});


// Rotas protegidas por autenticação
app.use('/api/v1/motoristas', authMiddleware, motoristasRouter);

app.use('/api/v1/manutencoes', authMiddleware, manutencoesRouter);


// Rota 404
app.use((req, res) => {
    res.status(404).json({
        erro: "Endpoint não encontrado no servidor Binario Tech"
    });
});


// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`[Binario Tech] Servidor de Middlewares ativo na porta ${PORT}`);
});
