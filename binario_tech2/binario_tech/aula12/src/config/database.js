const mongoose = require('mongoose');

const conectarBanco = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/binario_tech_nosql';
        
        // Adicionado 'return' para resolver a Promise corretamente no server.js
        const conexao = await mongoose.connect(uri);
        
        console.log('[Binario Tech] conexao NoSQL ativa!');
        return conexao;
    } catch (erro) {
        console.error(`[ERRO MONGODB]: ${erro.message}`);
        process.exit(1);
    }
};

module.exports = conectarBanco;
