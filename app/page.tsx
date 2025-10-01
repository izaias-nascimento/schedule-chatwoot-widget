'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const [parentUrl, setParentUrl] = useState<string>('')
  const [isInIframe, setIsInIframe] = useState<boolean>(false)
  const [referrerUrl, setReferrerUrl] = useState<string>('')

  useEffect(() => {
    // Captura a URL atual da página
    setCurrentUrl(window.location.href)
    
    // Verifica se está em iframe
    const inIframe = window.parent !== window
    setIsInIframe(inIframe)
    
    // Tenta capturar a URL da página pai (se estiver em iframe)
    if (inIframe) {
      try {
        setParentUrl(window.parent.location.href)
      } catch (error) {
        // Se não conseguir acessar a página pai (cross-origin)
        setParentUrl('Página pai não acessível (cross-origin)')
      }
    } else {
      setParentUrl('Não está em iframe')
    }
    
    // Captura o referrer (pode ser útil em alguns casos)
    if (document.referrer) {
      setReferrerUrl(document.referrer)
    } else {
      setReferrerUrl('Nenhum referrer disponível')
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('URL copiada para a área de transferência!')
    } catch (err) {
      console.error('Erro ao copiar: ', err)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Schedule Chatwoot Widget</h1>
        
        {/* Status do iframe */}
        <div style={{ 
          background: isInIframe ? '#dcfce7' : '#fef3c7', 
          border: `1px solid ${isInIframe ? '#16a34a' : '#f59e0b'}`,
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <strong style={{ color: isInIframe ? '#16a34a' : '#f59e0b' }}>
            {isInIframe ? '✅ Executando em iframe' : '⚠️ Executando diretamente'}
          </strong>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#374151' }}>
            URL Atual (Iframe):
          </h3>
          <div className="url-display">
            {currentUrl}
          </div>
          <button 
            className="button"
            onClick={() => copyToClipboard(currentUrl)}
          >
            Copiar URL Atual
          </button>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#374151' }}>
            URL da Página Pai:
          </h3>
          <div className="url-display">
            {parentUrl}
          </div>
          {parentUrl !== 'Não está em iframe' && parentUrl !== 'Página pai não acessível (cross-origin)' && (
            <button 
              className="button"
              onClick={() => copyToClipboard(parentUrl)}
            >
              Copiar URL da Página Pai
            </button>
          )}
        </div>

        {/* Informações adicionais */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#374151' }}>
            Referrer (Página de Origem):
          </h3>
          <div className="url-display">
            {referrerUrl}
          </div>
          {referrerUrl !== 'Nenhum referrer disponível' && (
            <button 
              className="button"
              onClick={() => copyToClipboard(referrerUrl)}
            >
              Copiar Referrer
            </button>
          )}
        </div>

        {/* Informações sobre cross-origin */}
        {parentUrl === 'Página pai não acessível (cross-origin)' && (
          <div style={{ 
            background: '#fef2f2', 
            border: '1px solid #fca5a5',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '20px',
            fontSize: '14px',
            color: '#dc2626'
          }}>
            <strong>ℹ️ Cross-Origin Policy:</strong><br/>
            A página pai não pode ser acessada devido às políticas de segurança do navegador. 
            Isso é normal quando o iframe está em um domínio diferente.
          </div>
        )}

        <div className="info">
          <p>
            Este widget pode ser inserido em qualquer página como iframe para mostrar 
            informações sobre as URLs envolvidas.
          </p>
          <p style={{ marginTop: '8px', fontSize: '12px' }}>
            Para usar como iframe: &lt;iframe src="URL_DESTE_SITE" width="500" height="400"&gt;&lt;/iframe&gt;
          </p>
        </div>
      </div>
    </div>
  )
}
