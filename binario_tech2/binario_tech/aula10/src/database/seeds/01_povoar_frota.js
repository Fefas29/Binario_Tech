exports.seed = async function(knex) {
	await knex('telemetria').del();
	await knex('veiculos').del();

	const [v1] = await knex('veiculos').insert({ placa: 'VOL-1010', montadora: 'Volvo', modelo: 'FH 540' });
	const [v2] = await knex('veiculos').insert({ placa: 'SCA-2020', montadora: 'Scania', modelo: 'R500' });
	// Insere as leituras inicias de telemetria 
	await knex('telemetria').insert([
		{ veiculo_id: v1, velocidade: 80.0, temperatura_motor: 88.5 
		},
		
		{ veiculo_id: v1, velocidade: 85.2, temperatura_motor: 90.1
		},
	]);
};
