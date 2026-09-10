#!/bin/bash

echo "====================================="
echo " AUDITORIA DO SERVIDOR BINARIO TECH"
echo "====================================="
curl -s http://localhost:3011/api/v1/status-servidor | jq .

curl -s http://localhost:3011/api/v1/status-servidor > processos.log | jq .
