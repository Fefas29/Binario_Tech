# Aula 03 — Comandos dos Exercícios

## Exercício 01 — Scania + cURL + jq

```bash
curl -s http://localhost:3001/api/v1/scania | jq '.modelo'
```

---

## Exercício 02 — Mercedes + HTTPie

```bash
http GET http://localhost:3001/api/v1/mercedes > mercedes.json
```

---

## Exercício 03 — Filtrar status com jq

```bash
jq '.status' mercedes.json
```

---

## Exercício 04 — Adicionar rota Volvo

Abrir o arquivo:


nano telemetria.js
```

Adicionar:

app.get('/api/v1/volvo', (req, res) => {
    res.json({
        montadora: "Volvo",
        modelo: "FH 540",
        status: "OK",
        conexao: true,
        velocidade_media: 80
    });
});
```

Parar o servidor:


CTRL + C


Iniciar novamente:


node telemetria.js


Testar:


curl -s http://localhost:3001/api/v1/volvo | jq .


---

## Exercício 05 — npm start

Abrir o `package.json`:


nano package.json

Adicionar:


"scripts": {
    "start": "node telemetria.js"
}


Executar:


npm start


---

## Exercício 06 — Gerar relatório

Dar permissão de execução:

bash
chmod +x testar_telemetria.sh


Executar salvando em `relatorio.log`:

bash
./testar_telemetria.sh > relatorio.log


Visualizar:

bash
cat relatorio.log

---

## Exercício 07 — Filtrar montadora e status


curl -s http://localhost:3001/api/v1/vw | jq '{montadora, status}'


---

## Exercício 08 — Encontrar e encerrar o Node.js

Localizar o processo:

ps aux | grep node


Encerrar usando o PID:


kill -9 <PID>


Exemplo:


kill -9 12345

