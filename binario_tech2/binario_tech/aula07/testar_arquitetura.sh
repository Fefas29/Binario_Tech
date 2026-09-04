#!/bin/bash

echo "================================================"
echo " TESTE INTEGRADO DE ARQUITETURA - BINARIO TECH "
echo "==============================================="

echo -e "\n[1] Consultando Telemetria Scania..."
curl -s http://localhost:3000/api/v1/telemetria/scania | jq .

echo -e "\n[2] Eviando dados de telemetria com alerta de temperatura"
curl -s -x POST http://localhost:3000/api/v1/telemetria/scania \
	-H "Content-type: application/json" \
	-d '{"modelo":"R450","vin":"9BS555444333","temperatura_motor":99}' | jq .

echo -e "\n[3] Testando telemetria Endpoint Inexistente (404)..."
curl -s http://localhost:3000/api/v1/telemetria/volvo | jq .
