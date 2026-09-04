function authMiddleware(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    const CHAVE_VALIDA = "binario-tech-secret-2026";

    if (!apiKey || apiKey !== CHAVE_VALIDA) {
        return res.status(401).json({
            erro: "Acesso não autorizado. Header 'X-API-KEY' inválido ou ausente."
        });
    }

    next();
}

module.exports = authMiddleware;
