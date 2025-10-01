# Use a imagem oficial do Node.js como base
FROM node:22-alpine AS base

# Instalar dependências apenas quando necessário
FROM base AS deps
# Verificar https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine para entender por que libc6-compat pode ser necessário.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar dependências baseado no gerenciador de pacotes preferido
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild do código fonte apenas quando necessário
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js coleta telemetria completamente anônima sobre uso geral.
# Saiba mais aqui: https://nextjs.org/telemetry
# Descomente a linha abaixo caso queira desabilitar telemetria durante o build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Imagem de produção, copiar todos os arquivos e executar next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Descomente a linha abaixo caso queira desabilitar telemetria durante o runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar pasta public
COPY --from=builder /app/public ./public

# Configurar as permissões corretas para o cache do Next.js
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar automaticamente os arquivos de saída para rastrear o cache
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
# Configurar hostname para aceitar conexões de qualquer IP
ENV HOSTNAME="0.0.0.0"

# server.js é criado pelo comando next build a partir do next.config.js
CMD ["node", "server.js"]
