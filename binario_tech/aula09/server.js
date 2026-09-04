const express = require('express');
const cors = require('cors');
const telemetriaRoutes = require('./src/routes/telemetriaRoutes')

const app = express();
const PORT = 3000

app.use(cors());
app.use(express.json());

app.use('/api/v1/telemetria', telemetriaRoutes);

app.use((req, res) => {
	res.status(404).json({ erro: "Rota nao encontrada na binario tech." });
});

app.listen(PORT, () => {
	console.log(`[BINARIO TECH] Servidor Relacional ativo na porta ${PORT}`);
});


