
#!/bin/bash

echo ""
echo "   DIAGNÓSTICO DOCKER COMPOSE - BINÁRIO TECH"
echo ""

docker compose ps

echo ""
echo "--- Teste de Conectividade do Serviço Web ---"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  http://localhost:3011/api/v1/visitas)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "[OK] Aplicação Web e Redis respondendo corretamente (HTTP 200)."
else
    echo "[ERRO] Falha ao comunicar com a aplicação (HTTP Status: $HTTP_CODE)."
fi

echo "=================================================="


