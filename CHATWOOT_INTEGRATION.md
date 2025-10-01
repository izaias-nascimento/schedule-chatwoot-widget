# Integração com Chatwoot Dashboard Apps

Este documento explica como usar o Schedule Chatwoot Widget como um Dashboard App no Chatwoot.

## 📋 Visão Geral

O projeto inclui uma página especializada (`/chatwoot`) que implementa os eventos de escuta do Chatwoot Dashboard Apps conforme a [documentação oficial](https://www.chatwoot.com/hc/user-guide/articles/1677691702-how-to-use-dashboard-apps).

## 🔧 Funcionalidades Implementadas

### 1. **Event Listener Automático**
```javascript
window.addEventListener("message", function (event) {
  if (!isJSONValid(event.data)) {
    return;
  }
  const eventData = JSON.parse(event.data);
  // Processa os dados do Chatwoot
});
```

### 2. **Solicitação de Dados On-Demand**
```javascript
window.parent.postMessage('chatwoot-dashboard-app:fetch-info', '*')
```

### 3. **Dados Capturados**
- ✅ **Conversa**: ID, status, mensagens, metadados
- ✅ **Contato**: Nome, email, telefone, atributos customizados
- ✅ **Agente Atual**: Informações do agente logado
- ✅ **Contexto Completo**: Todos os dados disponíveis

## 🚀 Como Configurar no Chatwoot

### Passo 1: Acessar Configurações
1. Vá para **Settings → Integrations → Dashboard apps**
2. Clique em **"Configure"** na seção Dashboard Apps

### Passo 2: Configurar o App
- **Nome do App**: `Schedule Chatwoot Widget`
- **URL**: `https://SEU_DOMINIO.com/chatwoot`

### Passo 3: Testar
1. Abra uma conversa no Chatwoot
2. Clique na aba do seu app
3. Os dados da conversa aparecerão automaticamente

## 📊 Dados Disponíveis

### **Conversa (Conversation)**
```json
{
  "id": 123,
  "status": "open",
  "can_reply": true,
  "unread_count": 2,
  "messages": [...],
  "meta": {
    "sender": {...},
    "channel": "web_widget",
    "assignee": {...}
  }
}
```

### **Contato (Contact)**
```json
{
  "id": 456,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone_number": "+55 11 99999-9999",
  "custom_attributes": {...}
}
```

### **Agente Atual (Current Agent)**
```json
{
  "id": 789,
  "name": "Maria Santos",
  "email": "maria@empresa.com"
}
```

## 🎯 Casos de Uso

### 1. **Visualização de Dados do Cliente**
- Histórico de conversas
- Informações de contato
- Status da conversa

### 2. **Integração com Sistemas Externos**
- Buscar dados do CRM
- Verificar histórico de pedidos
- Consultar informações de pagamento

### 3. **Automação de Atendimento**
- Sugerir respostas baseadas no contexto
- Aplicar regras de negócio
- Roteamento inteligente

## 🔍 Monitoramento

### **Status do Listener**
- ✅ Verde: Escutando eventos do Chatwoot
- ⚠️ Amarelo: Aguardando eventos

### **Contadores**
- Último evento recebido
- Total de eventos processados
- Status da conexão

## 📱 Interface

### **Seções Disponíveis**
1. **Status do Listener**: Indica se está recebendo eventos
2. **Dados da Conversa**: Informações da conversa ativa
3. **Dados do Contato**: Informações do cliente
4. **Agente Atual**: Dados do agente logado
5. **Dados Completos**: JSON completo para debug

### **Funcionalidades**
- 📋 **Copiar dados** para área de transferência
- 🔄 **Solicitar atualização** manual
- 📊 **Visualização estruturada** dos dados
- 🎨 **Interface responsiva** e intuitiva

## 🛠️ Desenvolvimento

### **Estrutura do Projeto**
```
app/
├── page.tsx          # Página principal (URLs)
├── chatwoot/
│   └── page.tsx      # Página do Chatwoot Dashboard App
└── layout.tsx        # Layout base
```

### **Eventos Implementados**
- `message`: Escuta eventos do Chatwoot
- `chatwoot-dashboard-app:fetch-info`: Solicita dados atualizados

### **Tipos TypeScript**
- `ChatwootData`: Interface principal
- `ConversationData`: Dados da conversa
- `ContactData`: Dados do contato
- `CurrentAgentData`: Dados do agente

## 🚀 Deploy

### **URLs de Acesso**
- **Principal**: `https://seu-dominio.com/`
- **Chatwoot**: `https://seu-dominio.com/chatwoot`

### **Configuração no Chatwoot**
```
Nome: Schedule Chatwoot Widget
URL: https://seu-dominio.com/chatwoot
```

## 📚 Referências

- [Documentação Oficial do Chatwoot](https://www.chatwoot.com/hc/user-guide/articles/1677691702-how-to-use-dashboard-apps)
- [YouTube Live sobre Dashboard Apps](https://www.youtube.com/watch?v=VIDEO_ID)
- [API de PostMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

## 🔧 Troubleshooting

### **Problemas Comuns**
1. **Não recebe eventos**: Verifique se a URL está configurada corretamente
2. **Dados não aparecem**: Confirme se uma conversa está ativa
3. **Erro de CORS**: Verifique as configurações de iframe

### **Debug**
- Abra o console do navegador para ver logs
- Verifique se os eventos estão sendo recebidos
- Confirme se o JSON está sendo parseado corretamente
