const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
const validarJWT = require('../middlewares/validarJWT');

const router = express.Router();

const validacaoAuth = [
  body('email')
    .isEmail()
    .withMessage('Informe um e-mail valido.'),

  body('senha')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter no minimo 6 caracteres.')
];

// QUESTAO 1
router.post(
  '/register',
  validacaoAuth,
  authController.registrar
);

// QUESTAO 2
router.post(
  '/login',
  validacaoAuth,
  authController.login
);

// QUESTAO 3
router.get(
  '/relatorio',
  validarJWT,
  authController.obterRelatorio
);

module.exports = router;
