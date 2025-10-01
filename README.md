# Schedule Chatwoot - Iframe Widget

Este é um projeto Next.js que cria uma página que pode ser inserida como iframe em qualquer site para mostrar informações sobre URLs.

## Funcionalidades

### 📍 **Página Principal** (`/`)
- ✅ Exibe a URL atual da página (iframe)
- ✅ Tenta capturar a URL da página pai
- ✅ Análise detalhada dos componentes da URL
- ✅ Interface responsiva e moderna
- ✅ Botões para copiar URLs

### 📞 **Página Chatwoot** (`/chatwoot`)
- ✅ Integração completa com Chatwoot Dashboard Apps
- ✅ Escuta eventos automáticos do Chatwoot
- ✅ Captura dados de conversa, contato e agente
- ✅ Solicitação de dados on-demand
- ✅ Interface especializada para atendimento
- ✅ Configurado para funcionar em iframes

## Como usar

### Opção 1: Desenvolvimento Local

#### 1. Instalar dependências

```bash
npm install
```

#### 2. Executar em desenvolvimento

```bash
npm run dev
```

### Opção 2: Docker

#### 1. Build da imagem

```bash
docker build -t schedule-chatwoot .
```

#### 2. Executar container

```bash
docker run -p 3000:3000 schedule-chatwoot
```

#### 3. Usar Docker Compose (recomendado)

```bash
# Executar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

#### 4. Script de build automático

```bash
# Executar script de build
./build.sh
```

### 3. Usar como iframe

#### **Página Principal** (URLs)
```html
<iframe 
  src="URL_DO_SEU_DEPLOY" 
  width="500" 
  height="400"
  frameborder="0"
  allowfullscreen>
</iframe>
```

#### **Página Chatwoot** (Dashboard App)
1. Configure no Chatwoot: **Settings → Integrations → Dashboard apps**
2. URL: `https://SEU_DOMINIO.com/chatwoot`
3. Nome: `Schedule Chatwoot Widget`

## Estrutura do projeto

- `app/page.tsx` - Página principal com o widget de URLs
- `app/chatwoot/page.tsx` - Página especializada para Chatwoot Dashboard Apps
- `app/layout.tsx` - Layout base da aplicação
- `app/globals.css` - Estilos globais
- `next.config.js` - Configurações do Next.js para iframe
- `Dockerfile` - Configuração para containerização
- `docker-compose.yml` - Orquestração de containers
- `.dockerignore` - Arquivos ignorados no build Docker
- `CHATWOOT_INTEGRATION.md` - Documentação da integração com Chatwoot

## Deploy

Este projeto pode ser deployado em:
- **Docker**: Qualquer servidor com Docker
- **Vercel**: Deploy direto (recomendado para desenvolvimento)
- **Netlify**: Deploy estático
- **Railway**: Deploy com Docker
- **AWS/GCP/Azure**: Deploy com containers

## Configurações de iframe

O projeto está configurado com headers apropriados para funcionar em iframes:
- `X-Frame-Options: SAMEORIGIN`
- `Content-Security-Policy: frame-ancestors 'self' *`

## Docker

### Comandos úteis

```bash
# Build da imagem
docker build -t schedule-chatwoot .

# Executar container
docker run -p 3000:3000 schedule-chatwoot

# Executar em background
docker run -d -p 3000:3000 --name schedule-chatwoot schedule-chatwoot

# Ver logs
docker logs schedule-chatwoot

# Parar container
docker stop schedule-chatwoot

# Remover container
docker rm schedule-chatwoot
```
# schedule-chatwoot-widget
