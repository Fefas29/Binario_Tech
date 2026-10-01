# Aula 22 - Docker e Conteinerização

## Sobre a aula

Nesta aula aprendemos os conceitos básicos de Docker e como utilizar containers para executar aplicações Node.js de forma isolada.

## O que foi feito

* Criação de uma API Node.js com Express.
* Configuração de variáveis de ambiente.
* Criação de um arquivo `Dockerfile`.
* Criação do arquivo `.dockerignore`.
* Construção de uma imagem Docker.
* Execução e gerenciamento de containers.
* Mapeamento de portas entre o computador e o container.
* Uso de comandos Docker para logs, status e acesso ao container.

## Arquivos principais

* `server.js` → Código da API.
* `package.json` → Dependências e configuração do projeto.
* `Dockerfile` → Instruções para criar a imagem Docker.
* `.dockerignore` → Arquivos ignorados durante o build.
* `validar_docker.sh` → Script para verificar o funcionamento do container.
* `limpar_ambiente_docker.sh` → Script para limpar containers parados e imagens pendentes.

## Comandos utilizados

Criar imagem:

```bash
docker build -t binario-tech/api-docker:1.0 .
```

Executar container:

```bash
docker run -d --name rosa-telemetria -p 8090:3011 binario-tech/api-docker:latest
```

Ver containers ativos:

```bash
docker ps
```

Ver logs:

```bash
docker logs nome-do-container
```

Acessar container:

```bash
docker exec -it nome-do-container sh
```

## Objetivo

Aprender a utilizar Docker para facilitar o desenvolvimento, organização e execução de aplicações em diferentes ambientes.

