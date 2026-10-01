#!/bin/bash

URL="http://localhost:3011/api/v1/veiculos"
LOG="crud_result.log"

echo "===== INÍCIO DOS TESTES =====" > "$LOG"

echo "=== Cadastrando veículo 1 ===" >> "$LOG"
curl -s -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{
    "montadora": "Volvo",
    "modelo": "FH 540",
    "placa": "AAA-1111"
  }' | jq >> "$LOG"

echo "=== Cadastrando veículo 2 ===" >> "$LOG"
curl -s -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d '{
    "montadora": "Mercedes",
    "modelo": "Actros",
    "placa": "BBB-2222"
  }' | jq >> "$LOG"

echo "=== Atualizando veículo 1 ===" >> "$LOG"
curl -s -X PATCH "$URL/1" \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ROTA"}' | jq >> "$LOG"

echo "=== Deletando veículo 2 ===" >> "$LOG"
curl -s -X DELETE "$URL/2" >> "$LOG"

echo "===== FIM DOS TESTES =====" >> "$LOG"
