#!/bin/bash

echo "========================================="
echo " TESTE AUTOMÁTICO DO SERVIDOR"
echo "========================================="

echo
echo "[$(date '+%H:%M:%S')] Testando rota /status"
curl -s http://localhost:3001/status | jq .

echo
echo "[$(date '+%H:%M:%S')] Testando rota /scania/info"
curl -s http://localhost:3001/scania/info | jq .

echo
echo "[$(date '+%H:%M:%S')] Testando rota /vw/info"
curl -s http://localhost:3001/vw/info | jq .

echo
echo "========================================="
echo "Testes finalizados!"
echo "========================================="
