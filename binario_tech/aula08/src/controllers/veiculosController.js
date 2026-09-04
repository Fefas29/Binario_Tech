const db = require('../database/connection');

const veiculosController = {
  listarTodos: async (req, res) => {
    try {
      const veiculos = await db('veiculos').select('*');
      return res.status(200).json(veiculos);
    } catch (erro) {
      return res.status(500).json({ erro: "Erro ao consultar banco de dados." });
    }
  },

  // EXERCÍCIO 1
  buscarPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const veiculo = await db('veiculos').where({ id }).first();

      if (!veiculo) {
        return res.status(404).json({ erro: 'Veiculo nao encontrado.' });
      }

      return res.status(200).json(veiculo);
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao consultar veiculo no banco de dados.' });
    }
  },

  criar: async (req, res) => {
    try {
      const { placa, montadora, modelo } = req.body;

      if (!placa || !montadora || !modelo) {
        return res.status(400).json({
          erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios."
        });
      }

      const [id] = await db('veiculos').insert({ placa, montadora, modelo });
      const novoVeiculo = await db('veiculos').where({ id }).first();

      return res.status(201).json(novoVeiculo);
    } catch (erro) {
      if (erro.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ erro: "Ja existe um veiculo cadastrado com essa placa." });
      }

      return res.status(500).json({ 
        erro: "Erro ao inserir veiculo no banco de dados.", 
        detalhe: erro.message 
      });
    }
  },

  // EXERCÍCIO 2
  atualizarStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ erro: "O campo 'status' é obrigatório." });
      }

      const linhasAfetadas = await db('veiculos')
        .where({ id })
        .update({ status });

      if (!linhasAfetadas) {
        return res.status(404).json({ erro: 'Veiculo nao encontrado.' });
      }

      return res.status(200).json({ mensagem: 'Status atualizado com sucesso.' });
    } catch (erro) {
      return res.status(500).json({ erro: 'Erro ao atualizar status do veículo.' });
    }
  }
};

module.exports = veiculosController;
