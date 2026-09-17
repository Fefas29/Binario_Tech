const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

// QUESTAO 1 - REGISTRO
exports.registrar = async (req, res) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({
      erros: erros.array()
    });
  }

  const { email, senha } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ email });

    if (usuarioExiste) {
      return res.status(400).json({
        erro: 'E-mail ja cadastrado.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = await Usuario.create({
      email,
      senha: senhaHash
    });

    return res.status(201).json({
      mensagem: 'Usuario cadastrado com sucesso!',
      usuario: {
        id: novoUsuario._id,
        email: novoUsuario.email
      }
    });

  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro interno ao registrar usuario.'
    });
  }
};

// QUESTAO 2 - LOGIN
exports.login = async (req, res) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({
      erros: erros.array()
    });
  }

  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        erro: 'Credenciais invalidas.'
      });
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({
        erro: 'Credenciais invalidas.'
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30m'
      }
    );

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token
    });

  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro interno ao realizar login.'
    });
  }
};

// QUESTAO 3 - RELATORIO PROTEGIDO
exports.obterRelatorio = async (req, res) => {
  return res.status(200).json({
    status: 'SUCESSO',
    mensagem: 'Acesso autorizado ao relatorio da prova!',
    usuarioAutenticado: req.usuario,
    dataGeracao: new Date()
  });
};
