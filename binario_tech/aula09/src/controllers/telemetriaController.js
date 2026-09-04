const db = require('../database/connection');

const telemetriaController = {
    // Cadastrar nova leitura de telemetria associada a um veiculo
    registarLeitura: async (req, res) => {
        try {
            const { veiculo_id, velocidade, temperatura_motor } = req.body;

            if (!veiculo_id || velocidade === undefined || temperatura_motor === undefined) {
                return res.status(400).json({
                    erro: "veiculo_id, velocidade e temperatura_motor sao obrigatorios."
                });
            }

            const veiculoExiste = await db('veiculos')
                .where({ id: veiculo_id })
                .first();

            if (!veiculoExiste) {
                return res.status(404).json({
                    erro: "Veiculo informado nao existe no banco de dados."
                });
            }

            const [id] = await db('telemetria').insert({
                veiculo_id,
                velocidade,
                temperatura_motor
            });

            return res.status(201).json({
                id,
                veiculo_id,
                velocidade,
                temperatura_motor,
                mensagem: "Leitura registrada com sucesso!"
            });

                } catch (erro) {
            console.error(erro);
            return res.status(500).json({
                erro: erro.message
            });
        }
    },

    // Listar todas as leituras com dados do veiculo (INNER JOIN)
   listarRelatorioCompleto: async (req, res) => {
    try {
        const { alerta } = req.query;

        const relatorio = await db('telemetria')
            .join('veiculos', 'veiculos.id', '=', 'telemetria.veiculo_id')
            .where(function() {
                if (alerta === 'true') {
                    this.where('telemetria.temperatura_motor', '>', 95);
                }
            })
            .select(
                'telemetria.id as telemetria_id',
                'veiculos.placa',
                'veiculos.montadora',
                'veiculos.modelo',
                'telemetria.velocidade',
                'telemetria.temperatura_motor',
                'telemetria.capturado_em'
            );

        return res.status(200).json(relatorio);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao gerar relatorio com inner join."
        });
    }
}, 
	buscarPorVeiculo: async (req, res) => {
    try {
        const { id } = req.params;

        const veiculoExiste = await db('veiculos')
            .where({ id })
            .first();

        if (!veiculoExiste) {
            return res.status(404).json({
                erro: "Veiculo nao encontrado."
            });
        }

        const leituras = await db('telemetria')
            .where({ veiculo_id: id });

        return res.status(200).json(leituras);

    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao buscar telemetria do veiculo."
        });
    }
},
};

module.exports = telemetriaController;
