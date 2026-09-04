function tratarErros(err, req, res, next) {
    console.error('[ERRO LOG]:', err.message || err);

    // Captura erros de sintaxe no JSON enviados no corpo da requisição
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            erro: "Sintaxe de JSON inválida no corpo da requisição. Verifique vírgulas, aspas e chaves."
        });
    }

    const mensagemErro = err.message || '';

    // Tratamento de erro do SQLite/Knex de duplicidade (ex: placa duplicada)
    if (err.code === 'SQLITE_CONSTRAINT' || mensagemErro.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ 
            erro: "Conflito: registro já existente no sistema." 
        });
    }

    // Tratamento genérico de erro 500
    return res.status(500).json({ 
        erro: "Erro interno no servidor.",
        detalhes: mensagemErro 
    });
}

module.exports = tratarErros;
