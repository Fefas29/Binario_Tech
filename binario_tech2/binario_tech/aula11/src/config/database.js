const mongoose = require('mongoose');

const conectarBanco = async () => {
	try {
		const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/binario_tech_nosql';
		await mongoose.connect(uri);
		console.log('Binario Tech] Conexao com mongoDB estabelecida com sucesso!');
	} catch (erro) {
		console.error(`[ERRO MONGODB]: Falaha ao conectar ao banco - ${erro.message}`);
	}
};

module.exports = conectarBanco
