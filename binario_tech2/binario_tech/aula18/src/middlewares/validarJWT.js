const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      erro: 'Acesso negado. Token não informado.'
    });
  }

  try {
    const usuarioDecodificado = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = usuarioDecodificado;

    next();
  } catch (err) {
    return res.status(403).json({
      erro: 'Token inválido ou expirado.'
    });
  }
};
