#!/bin/bash

echo "====================================="
echo " AUDITORIA DO SERVIDOR BINARIO TECH"
echo "====================================="

echo"Listando o resultado da lista"
ps aux | grep node >> ./processos.log

echo"Resultado da Lista"
sleep 2
cat processos.log
