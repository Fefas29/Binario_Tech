const mongoose = require('mongoose');

// Subdocumento de Peças com validação para impedir valores negativos
const itemPecaSchema = new mongoose.Schema({
  nomePeca: { 
    type: String, 
    required: [true, 'O nome da peça é obrigatório'] 
  },
  quantidade: { 
    type: Number, 
    required: true, 
    default: 1,
    min: [1, 'A quantidade mínima deve ser 1'] 
  },
  custoUnitario: { 
    type: Number, 
    required: [true, 'O custo unitário é obrigatório'],
    min: [0, 'O custo unitário não pode ser um valor negativo'] // Validação aplicada aqui
  }
});

const manutencaoSchema = new mongoose.Schema({
  veiculoPlaca: { 
    type: String, 
    required: true, 
    uppercase: true 
  },
  tipoManutencao: {
    type: String,
    enum: ['PREVENTIVA', 'CORRETIVA', 'EMERGENCIAL'],
    default: 'PREVENTIVA'
  },
  custoTotal: { 
    type: Number, 
    required: true,
    min: [0, 'O custo total não pode ser negativo']
  },
  pecasSubstituidas: [itemPecaSchema],
  status: { 
    type: String, 
    enum: ['ABERTA', 'EM_ANDAMENTO', 'CONCLUIDA'], 
    default: 'ABERTA' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Manutencao', manutencaoSchema);
