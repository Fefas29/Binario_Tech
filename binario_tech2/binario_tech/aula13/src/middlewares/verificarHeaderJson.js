const verificarHeaderJson = (req, res, next) => {
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        status: "REQUISICAO_INVALIDA",
        mensagem: "O cabeçalho 'Content-Type: application/json' é obrigatório para requisições POST."
      });
    }
  }
  next();
};

module.exports = verificarHeaderJson;
