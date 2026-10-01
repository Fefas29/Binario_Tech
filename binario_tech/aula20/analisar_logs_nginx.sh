#!/bin/bash

echo "=============================================="
echo "      ANALISE DOS LOGS DO NGINX"
echo "=============================================="

echo "Ultimas 15 linhas do access.log com status 200:"
echo ""

sudo tail -n 15 /var/log/nginx/access.log | awk '$9 == 200'

echo ""
echo "=============================================="
