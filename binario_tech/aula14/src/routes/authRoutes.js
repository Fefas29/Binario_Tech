const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticarToken = require('../middlewares/autenticarToken');
const autorizarPerfil = require('../middlewares/autorizarPerfil');

// Rotas públicas
router.post('/register', authController.registrar);
router.post('/login', authController.login);

// Rota privada comum
router.get('/perfil', autenticarToken, authController.perfil);

// Rota privada restrita a ADMIN (Exercício 1)
router.get('/admin', autenticarToken, autorizarPerfil('ADMIN'), (req, res) => {
  res.status(200).json({
    mensagem: "Acesso concedido! Você está na área restrita da diretoria/admin.",
    usuario: req.usuario
  });
});

module.exports = router;
