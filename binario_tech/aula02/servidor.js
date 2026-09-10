const express = require('express');

const app = express();
const PORT = 3011;

app.use(express.json());

// Rota de status do servidor
app.get('/status', (req, res) => {
    res.json({
        status: "Servidor Online",
        uptime_segundos: process.uptime()
    });
});

// Rota de informações da montadora Scania
app.get('/scania/info', (req, res) => {
    res.json({
        montadora: "Scania",
        foco: "Caminhões Pesados e Ônibus",
        sistema_telemetria: "Ativo",
        unidades_conectadas: 1420
    });
});

// Rota de informações da montadora Volkswagen
app.get('/vw/info', (req, res) => {
    res.json({
        montadora: "Volkswagen",
        foco: "Caminhões e Veículos Comerciais",
        sistema_telemetria: "Ativo",
        unidades_conectadas: 980
    });
});

// Rota API v1 - Scania
app.get('/api/v1/scania', (req, res) => {
    res.json({
        montadora: "Scania",
        modelo: "8450",
        status: "OK",
        conexao: true,
        velocidade_media: 82
    });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
