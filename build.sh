#!/bin/bash

# Script para build e deploy do Schedule Chatwoot Widget

echo "🚀 Iniciando build do Schedule Chatwoot Widget..."

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Build da imagem
echo "📦 Construindo imagem Docker..."
docker build -t schedule-chatwoot .

if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo ""
    echo "🐳 Para executar o container:"
    echo "   docker run -p 3000:3000 schedule-chatwoot"
    echo ""
    echo "🐳 Para usar Docker Compose:"
    echo "   docker-compose up -d"
    echo ""
    echo "🌐 Acesse: http://localhost:3000"
else
    echo "❌ Erro no build. Verifique os logs acima."
    exit 1
fi
