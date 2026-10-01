# Aula 21 - CI/CD Deploy Automatizado

## Sobre o projeto

Projeto criado para praticar automação de deploy utilizando Node.js, PM2, Git e Shell Script.

---

## Arquivos

### server.js

Arquivo principal da API.

Ele cria o servidor utilizando Express e possui uma rota que mostra a versão da aplicação:

```
/api/v1/versao
```

---

### package.json

Arquivo de configuração do projeto Node.js.

Contém informações da aplicação e as dependências utilizadas.

---

### package-lock.json

Guarda as versões exatas das dependências instaladas pelo npm.

---

### deploy.sh

Script responsável pelo deploy automático.

Ele:

* Atualiza o código pelo Git.
* Instala as dependências.
* Reinicia a aplicação no PM2.
* Faz um teste para verificar se a API está funcionando.

---

### PM2

Ferramenta usada para manter a aplicação Node.js rodando no servidor.

Permite iniciar, reiniciar e acompanhar a aplicação.

---

### deploy_history.log

Arquivo que registra o histórico dos deploys.

Armazena a data, hora e o commit utilizado.

---

### Git Hook post-commit

Executa automaticamente o `deploy.sh` após um commit na branch `main`.

---

## Fluxo do projeto

```
Commit
  ↓
Git Hook
  ↓
deploy.sh
  ↓
PM2 reinicia a API
  ↓
Teste da API
```

## Objetivo

Aprender como funciona um processo simples de CI/CD automatizado em um ambiente Linux.

