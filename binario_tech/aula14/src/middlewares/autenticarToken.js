const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: "ERRO", mensagem: "Acesso negado. Token não fornecido." });
  }

  try {
    const segredo = process.env.JWT_SECRET || 'binario_tech_chave_secreta_super_segura_2026';
    const usuarioVerificado = jwt.verify(token, segredo);
    req.usuario = usuarioVerificado;
    next();
  } catch (erro) {
    return res.status(403).json({ status: "ERRO", mensagem: "Token inválido ou expirado." });
  }
};

module.exports = autenticarToken;
