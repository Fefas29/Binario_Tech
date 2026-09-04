#!/bin/bash

URL="http://localhost:3000"

echo "===== AUDITORIA COMPLETA =====" > auditoria.log
echo "Data: $(date)" >> auditoria.log
echo "" >> auditoria.log

echo "===== SCANIA =====" >> auditoria.log
curl -s "$URL/api/v1/telemetria/scania" >> auditoria.log
echo "" >> auditoria.log
echo "Status HTTP: $(curl -s -o /dev/null -w "%{http_code}" "$URL/api/v1/telemetria/scania")" >> auditoria.log
echo "" >> auditoria.log

echo "===== MERCEDES-BENZ =====" >> auditoria.log
curl -s "$URL/api/v1/telemetria/mercedes" >> auditoria.log
echo "" >> auditoria.log
echo "Status HTTP: $(curl -s -o /dev/null -w "%{http_code}" "$URL/api/v1/telemetria/mercedes")" >> auditoria.log
echo "" >> auditoria.log

echo "===== FIM DA AUDITORIA =====" >> auditoria.log
