const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const ARQUIVO_DADOS = path.join(__dirname, 'ocorrencias.json');

app.use(cors());
app.use(express.json());

// Função auxiliar: Ler o arquivo JSON
async function lerOcorrencias() {
  try {
    const dados = await fs.readFile(ARQUIVO_DADOS, 'utf-8');
    return JSON.parse(dados);
  } catch (erro) {
    // Se o arquivo não existir, cria um arquivo com array vazio e retorna []
    await fs.writeFile(ARQUIVO_DADOS, '[]', 'utf-8');
    return [];
  }
}

// Função auxiliar: Salvar no arquivo JSON
async function salvarOcorrencias(ocorrencias) {
  await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(ocorrencias, null, 2), 'utf-8');
}

// ROTA 1: Listar todas as ocorrências
app.get('/api/v1/ocorrencias', async (req, res) => {
  try {
    const ocorrencias = await lerOcorrencias();
    res.status(200).json(ocorrencias);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao ler base de dados em disco" });
  }
});

// ROTA 2: Cadastrar nova ocorrência na frota
app.post('/api/v1/ocorrencias', async (req, res) => {
  try {
    const { montadora, placa, descricao, gravidade } = req.body;

    if (!montadora || !placa || !descricao) {
      return res.status(400).json({ 
        erro: "Montadora, placa e descricao sao obrigatorios."
      });
    }

    const ocorrencias = await lerOcorrencias();
    const novaOcorrencia = {
      id: Date.now(),
      montadora,
      placa,
      descricao,
      gravidade: gravidade || "MEDIA",
      data_registro: new Date().toISOString()
    };

    ocorrencias.push(novaOcorrencia);
    await salvarOcorrencias(ocorrencias);

    res.status(201).json(novaOcorrencia);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao salvar ocorrencia em disco." });
  }
});

// ROTA 3: Filtrar ocorrências por montadora (NOVA)
app.get('/api/v1/ocorrencias/montadora/nome/:nome', async (req, res) => {
  try {
    const { nome } = req.params;
    const ocorrencias = await lerOcorrencias();

    const filtradas = ocorrencias.filter(
      (item) => item.montadora.toLowerCase() === nome.toLowerCase()
    );

    res.status(200).json(filtradas);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar ocorrências por montadora" });
  }
});

// ROTA 4: Remover ocorrência por ID
app.delete('/api/v1/ocorrencias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const ocorrencias = await lerOcorrencias();

    // Procura o índice do elemento com o id informado
    // Converte id para Number porque Date.now() salva como número
    const index = ocorrencias.findIndex((item) => item.id === Number(id));

    // Se não encontrar, retorna erro 404
    if (index === -1) {
      return res.status(404).json({ erro: "Ocorrência não encontrada." });
    }

    // Remove do array e salva a lista atualizada em disco
    const [removida] = ocorrencias.splice(index, 1);
    await salvarOcorrencias(ocorrencias);

    res.status(200).json({
      mensagem: "Ocorrência removida com sucesso.",
      removida
    });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao remover ocorrência do disco." });
  }
});


app.listen(PORT, () => {
  console.log(`[Binario Tech] API de ocorrencias ativas na porta ${PORT}`);
});
