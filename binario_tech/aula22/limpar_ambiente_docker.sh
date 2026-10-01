#!/bin/bash

echo "=================================================="
echo " LIMPEZA DE AMBIENTE DOCKER - BINÁRIO TECH"
echo "=================================================="

echo "[1/3] Parando containers inativos..."

CONTAINERS=$(docker ps -aq -f status=exited)

if [ -n "$CONTAINERS" ]; then
    docker stop $CONTAINERS 2>/dev/null
    echo "Containers parados."
else
    echo "Nenhum container parado encontrado."
fi


echo "[2/3] Removendo containers inativos..."

docker rm $(docker ps -aq -f status=exited) 2>/dev/null || echo "Nenhum container removido."


echo "[3/3] Removendo imagens pendentes (dangling)..."

docker image prune -f


echo "=================================================="
echo " Limpeza concluída!"
echo "=================================================="
