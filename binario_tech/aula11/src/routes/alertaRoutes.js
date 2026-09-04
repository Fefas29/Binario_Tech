const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');

router.post('/', alertaController.criarAlerta);
router.get('/', alertaController.listarAlertas);

// EXERCÍCIO 1: Rota para buscar por nível de severidade (/api/v1/alertas/severidade/:nivel)
router.get('/severidade/:nivel', alertaController.buscarPorSeveridade);

module.exports = router;
