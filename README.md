# Schedule Chatwoot - Iframe Widget

Este é um projeto Next.js que cria uma página que pode ser inserida como iframe em qualquer site para mostrar informações sobre URLs.

## Funcionalidades

- ✅ Exibe a URL atual da página (iframe)
- ✅ Tenta capturar a URL da página pai
- ✅ Interface responsiva e moderna
- ✅ Botões para copiar URLs
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

Após fazer o deploy, você pode inserir este widget em qualquer página usando:

```html
<iframe 
  src="URL_DO_SEU_DEPLOY" 
  width="500" 
  height="400"
  frameborder="0"
  allowfullscreen>
</iframe>
```

## Estrutura do projeto

- `app/page.tsx` - Página principal com o widget
- `app/layout.tsx` - Layout base da aplicação
- `app/globals.css` - Estilos globais
- `next.config.js` - Configurações do Next.js para iframe
- `Dockerfile` - Configuração para containerização
- `docker-compose.yml` - Orquestração de containers
- `.dockerignore` - Arquivos ignorados no build Docker

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
