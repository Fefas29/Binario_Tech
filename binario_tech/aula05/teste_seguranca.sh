#!/bin/bash

URL="http://localhost:3000/api/v1/motoristas"
API_KEY="binario-tech-secret-2026"

echo "===== AUDITORIA DE SEGURANÇA =====" > audit_seguranca.log
echo "Data: $(date)" >> audit_seguranca.log
echo "" >> audit_seguranca.log

echo "Tentativa 1 - Sem API Key" >> audit_seguranca.log
curl -s -w "\nStatus HTTP: %{http_code}\n" "$URL" >> audit_seguranca.log
echo "" >> audit_seguranca.log

echo "Tentativa 2 - Sem API Key" >> audit_seguranca.log
curl -s -w "\nStatus HTTP: %{http_code}\n" "$URL" >> audit_seguranca.log
echo "" >> audit_seguranca.log

echo "Tentativa 3 - Sem API Key" >> audit_seguranca.log
curl -s -w "\nStatus HTTP: %{http_code}\n" "$URL" >> audit_seguranca.log
echo "" >> audit_seguranca.log

echo "Tentativa 4 - Com API Key válida" >> audit_seguranca.log
curl -s -w "\nStatus HTTP: %{http_code}\n" \
-H "X-API-KEY: $API_KEY" \
"$URL" >> audit_seguranca.log

echo "" >> audit_seguranca.log
echo "===== FIM DA AUDITORIA =====" >> audit_seguranca.log
