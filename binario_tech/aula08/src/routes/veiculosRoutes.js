const express = require('express');
const router = express.Router();
const veiculosController = require('../controllers/veiculosController');

router.get('/', veiculosController.listarTodos);
router.post('/', veiculosController.criar);
router.get('/:id', veiculosController.buscarPorId); // EXERCÍCIO 1

// EXERCÍCIO 2: Adiciona a rota PATCH para atualizar o status
router.patch('/:id/status', veiculosController.atualizarStatus);

module.exports = router;
