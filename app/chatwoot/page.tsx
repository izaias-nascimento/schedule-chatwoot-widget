'use client'

import { useState, useEffect } from 'react'

interface ChatwootData {
  conversation?: any
  contact?: any
  currentAgent?: any
}

interface ConversationData {
  id: number
  messages: any[]
  account_id: number
  status: string
  can_reply: boolean
  unread_count: number
  meta: {
    sender: any
    channel: string
    assignee: any
    hmac_verified: boolean
  }
  additional_attributes: {
    browser?: any
    referer?: string
    initiated_at?: any
  }
  custom_attributes: any
  labels: string[]
  muted: boolean
  snoozed_until: any
  timestamp: number
  agent_last_seen_at: number
  assignee_last_seen_at: number
  contact_last_seen_at: number
  inbox_id: number
  allMessagesLoaded: boolean
  dataFetched: boolean
}

interface ContactData {
  id: number
  name: string
  email: string
  phone_number: string
  identifier: string | null
  thumbnail: string
  availability_status: string
  last_activity_at: number
  custom_attributes: any
  additional_attributes: {
    description?: string
    company_name?: string
    social_profiles?: {
      github?: string
      twitter?: string
      facebook?: string
      linkedin?: string
    }
  }
}

interface CurrentAgentData {
  id: number
  name: string
  email: string
}

export default function ChatwootDashboard() {
  const [chatwootData, setChatwootData] = useState<ChatwootData>({})
  const [isListening, setIsListening] = useState<boolean>(false)
  const [lastEvent, setLastEvent] = useState<string>('')
  const [eventCount, setEventCount] = useState<number>(0)
  const [requestedData, setRequestedData] = useState<any>(null)

  useEffect(() => {
    // Função para validar JSON
    const isJSONValid = (str: string): boolean => {
      try {
        JSON.parse(str)
        return true
      } catch {
        return false
      }
    }

    // Listener para eventos do Chatwoot
    const handleMessage = (event: MessageEvent) => {
      console.log('Evento recebido:', event.data)
      
      if (!isJSONValid(event.data)) {
        console.log('Dados não são JSON válido:', event.data)
        return
      }

      try {
        const eventData = JSON.parse(event.data)
        console.log('Dados parseados:', eventData)
        
        setLastEvent(new Date().toLocaleTimeString())
        setEventCount(prev => prev + 1)

        // Verifica se é um evento de contexto do app
        if (eventData.event === 'appContext') {
          console.log('Contexto do app recebido:', eventData.data)
          setChatwootData(eventData.data)
          setIsListening(true)
        }
      } catch (error) {
        console.error('Erro ao processar evento:', error)
      }
    }

    // Adiciona o listener
    window.addEventListener('message', handleMessage)

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  // Função para solicitar dados do Chatwoot
  const requestChatwootData = () => {
    try {
      window.parent.postMessage('chatwoot-dashboard-app:fetch-info', '*')
      console.log('Solicitação de dados enviada para o Chatwoot')
    } catch (error) {
      console.error('Erro ao solicitar dados:', error)
    }
  }

  // Função para copiar dados
  const copyToClipboard = async (data: any, label: string) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      alert(`${label} copiado para a área de transferência!`)
    } catch (err) {
      console.error('Erro ao copiar: ', err)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Chatwoot Dashboard App</h1>
        
        {/* Status do listener */}
        <div style={{ 
          background: isListening ? '#dcfce7' : '#fef3c7', 
          border: `1px solid ${isListening ? '#16a34a' : '#f59e0b'}`,
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <strong style={{ color: isListening ? '#16a34a' : '#f59e0b' }}>
            {isListening ? '✅ Escutando eventos do Chatwoot' : '⚠️ Aguardando eventos do Chatwoot'}
          </strong>
          {lastEvent && (
            <div style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>
              Último evento: {lastEvent} | Total: {eventCount}
            </div>
          )}
        </div>

        {/* Botão para solicitar dados */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button 
            className="button"
            onClick={requestChatwootData}
            style={{ marginRight: '10px' }}
          >
            🔄 Solicitar Dados do Chatwoot
          </button>
        </div>

        {/* Dados da Conversa */}
        {chatwootData.conversation && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#374151' }}>
              📞 Dados da Conversa:
            </h3>
            <div style={{ 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: '500' }}>ID da Conversa:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.conversation.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: '500' }}>Status:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.conversation.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: '500' }}>Pode Responder:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.conversation.can_reply ? 'Sim' : 'Não'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: '500' }}>Mensagens Não Lidas:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.conversation.unread_count}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: '500' }}>Canal:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.conversation.meta?.channel || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: '500' }}>Total de Mensagens:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.conversation.messages?.length || 0}</span>
                </div>
              </div>
            </div>
            <button 
              className="button"
              onClick={() => copyToClipboard(chatwootData.conversation, 'Dados da Conversa')}
            >
              📋 Copiar Dados da Conversa
            </button>
          </div>
        )}

        {/* Dados do Contato */}
        {chatwootData.contact && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#374151' }}>
              👤 Dados do Contato:
            </h3>
            <div style={{ 
              background: '#f0fdf4', 
              border: '1px solid #22c55e',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#166534', fontWeight: '500' }}>Nome:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.contact.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#166534', fontWeight: '500' }}>Email:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.contact.email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#166534', fontWeight: '500' }}>Telefone:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.contact.phone_number}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#166534', fontWeight: '500' }}>Identificador:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.contact.identifier || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#166534', fontWeight: '500' }}>Status:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.contact.availability_status}</span>
                </div>
                {chatwootData.contact.additional_attributes?.company_name && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#166534', fontWeight: '500' }}>Empresa:</span>
                    <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.contact.additional_attributes.company_name}</span>
                  </div>
                )}
              </div>
            </div>
            <button 
              className="button"
              onClick={() => copyToClipboard(chatwootData.contact, 'Dados do Contato')}
            >
              📋 Copiar Dados do Contato
            </button>
          </div>
        )}

        {/* Dados do Agente Atual */}
        {chatwootData.currentAgent && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#374151' }}>
              🎯 Agente Atual:
            </h3>
            <div style={{ 
              background: '#fef3c7', 
              border: '1px solid #f59e0b',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#92400e', fontWeight: '500' }}>Nome:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.currentAgent.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#92400e', fontWeight: '500' }}>Email:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.currentAgent.email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#92400e', fontWeight: '500' }}>ID:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{chatwootData.currentAgent.id}</span>
                </div>
              </div>
            </div>
            <button 
              className="button"
              onClick={() => copyToClipboard(chatwootData.currentAgent, 'Dados do Agente')}
            >
              📋 Copiar Dados do Agente
            </button>
          </div>
        )}

        {/* Dados Completos */}
        {Object.keys(chatwootData).length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#374151' }}>
              📊 Dados Completos do Chatwoot:
            </h3>
            <div style={{ 
              background: '#f3f4f6', 
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px',
              maxHeight: '300px',
              overflow: 'auto'
            }}>
              <pre style={{ 
                fontSize: '12px', 
                color: '#374151',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {JSON.stringify(chatwootData, null, 2)}
              </pre>
            </div>
            <button 
              className="button"
              onClick={() => copyToClipboard(chatwootData, 'Dados Completos')}
            >
              📋 Copiar Todos os Dados
            </button>
          </div>
        )}

        {/* Instruções */}
        <div className="info" style={{ marginTop: '24px' }}>
          <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#374151' }}>
            📖 Como usar:
          </h4>
          <ul style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5', paddingLeft: '16px' }}>
            <li>Esta página escuta eventos do Chatwoot automaticamente</li>
            <li>Use o botão "Solicitar Dados" para forçar uma atualização</li>
            <li>Os dados aparecerão quando uma conversa estiver ativa</li>
            <li>Configure esta URL como Dashboard App no Chatwoot</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
