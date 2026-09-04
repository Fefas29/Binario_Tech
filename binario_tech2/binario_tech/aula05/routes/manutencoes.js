const express = require('express');
const router = express.Router();

let manutencoes = [
    {
        id: 1,
        caminhaoId: 1,
        descricao: "Troca de óleo e filtros",
        valor: 850.00,
        status: "Pendente"
    }
];

// GET /api/v1/manutencoes
// Lista todas as manutenções
router.get('/', (req, res) => {
    res.status(200).json(manutencoes);
});

// POST /api/v1/manutencoes
// Cadastra uma nova manutenção
router.post('/', (req, res) => {
    const { caminhaoId, descricao, valor } = req.body;

    if (!caminhaoId || !descricao || !valor) {
        return res.status(400).json({
            erro: "Campos 'caminhaoId', 'descricao' e 'valor' são obrigatórios."
        });
    }

    const novaManutencao = {
        id: manutencoes.length + 1,
        caminhaoId,
        descricao,
        valor,
        status: "Pendente"
    };

    manutencoes.push(novaManutencao);

    res.status(201).json(novaManutencao);
});

module.exports = router;
