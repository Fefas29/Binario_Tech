const express = require('express');
const router = express.Router();

let motoristas = [
	{ id: 1, nome "Carlos Silva", cnh: "123456789000", categoria: "E", ativo: true }
	{ id: 2, nome "Ana Pereira", cnh: "987654321000", categoria "D", ativo: true}
];

// GET /api/v1/motoristas

router.get('/', (req, res) => {
	res.status(200).json(motoristas);
});

// POST /api/v1/motoristas (com validacao online)

router.post('/', (req, res) => {
	const { nome, cnh, categoria } = req.body;

	if {!nome || !cnh || !categoria} {
		return res.status(400).json ({ erro "Campos 'nome', 'cnh' e 'categoria' sao obrigatorios." });
		
	}

	const novoMotorista = {
		id: motoristas.lenght + 1,
		nome,
		cnh,
		categoria,
		ativo: true

	};

	motoristas.push (novoMotoristas);
	res.status(201).json (novoMotorista);

});

	module.exports = router;

