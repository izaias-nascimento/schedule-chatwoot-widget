'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const [parentUrl, setParentUrl] = useState<string>('')
  const [isInIframe, setIsInIframe] = useState<boolean>(false)
  const [referrerUrl, setReferrerUrl] = useState<string>('')
  const [urlDetails, setUrlDetails] = useState<any>({})
  const [referrerDetails, setReferrerDetails] = useState<any>({})

  useEffect(() => {
    // Captura a URL atual da página
    const fullUrl = window.location.href
    setCurrentUrl(fullUrl)
    
    // Analisa os componentes da URL
    const urlObj = new URL(fullUrl)
    setUrlDetails({
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      origin: urlObj.origin,
      href: urlObj.href
    })
    
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
      
      // Analisa os componentes da URL de origem
      try {
        const referrerObj = new URL(document.referrer)
        setReferrerDetails({
          protocol: referrerObj.protocol,
          hostname: referrerObj.hostname,
          port: referrerObj.port,
          pathname: referrerObj.pathname,
          search: referrerObj.search,
          hash: referrerObj.hash,
          origin: referrerObj.origin,
          href: referrerObj.href
        })
      } catch (error) {
        console.error('Erro ao analisar referrer:', error)
        setReferrerDetails({})
      }
    } else {
      setReferrerUrl('Nenhum referrer disponível')
      setReferrerDetails({})
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
            URL Completa Atual:
          </h3>
          <div className="url-display" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
            {currentUrl}
          </div>
          <button 
            className="button"
            onClick={() => copyToClipboard(currentUrl)}
            style={{ marginBottom: '16px' }}
          >
            📋 Copiar URL Completa
          </button>
          
          {/* Detalhes da URL */}
          <div style={{ 
            background: '#f8fafc', 
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '16px'
          }}>
            <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#475569', fontWeight: '600' }}>
              🔍 Componentes da URL:
            </h4>
            <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b', fontWeight: '500' }}>Protocolo:</span>
                <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{urlDetails.protocol}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b', fontWeight: '500' }}>Hostname:</span>
                <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{urlDetails.hostname}</span>
              </div>
              {urlDetails.port && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: '500' }}>Porta:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{urlDetails.port}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b', fontWeight: '500' }}>Caminho:</span>
                <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{urlDetails.pathname}</span>
              </div>
              {urlDetails.search && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: '500' }}>Query:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{urlDetails.search}</span>
                </div>
              )}
              {urlDetails.hash && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontWeight: '500' }}>Hash:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{urlDetails.hash}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '8px', marginTop: '8px' }}>
                <span style={{ color: '#64748b', fontWeight: '500' }}>Origin:</span>
                <span style={{ fontFamily: 'monospace', color: '#1e293b', fontWeight: '600' }}>{urlDetails.origin}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#374151' }}>
            URL da Página Pai:
          </h3>
          <div className="url-display" style={{ 
            fontSize: parentUrl.includes('não acessível') || parentUrl === 'Não está em iframe' ? '14px' : '16px',
            fontWeight: parentUrl.includes('não acessível') || parentUrl === 'Não está em iframe' ? 'normal' : 'bold'
          }}>
            {parentUrl}
          </div>
          {parentUrl !== 'Não está em iframe' && parentUrl !== 'Página pai não acessível (cross-origin)' && (
            <button 
              className="button"
              onClick={() => copyToClipboard(parentUrl)}
            >
              📋 Copiar URL da Página Pai
            </button>
          )}
        </div>

        {/* Informações adicionais */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#374151' }}>
            URL Completa da Página de Origem (Referrer):
          </h3>
          <div className="url-display" style={{ 
            fontSize: referrerUrl === 'Nenhum referrer disponível' ? '14px' : '16px',
            fontWeight: referrerUrl === 'Nenhum referrer disponível' ? 'normal' : 'bold',
            marginBottom: '12px'
          }}>
            {referrerUrl}
          </div>
          {referrerUrl !== 'Nenhum referrer disponível' && (
            <button 
              className="button"
              onClick={() => copyToClipboard(referrerUrl)}
              style={{ marginBottom: '16px' }}
            >
              📋 Copiar URL Completa de Origem
            </button>
          )}
          
          {/* Detalhes da URL de origem */}
          {Object.keys(referrerDetails).length > 0 && (
            <div style={{ 
              background: '#f0fdf4', 
              border: '1px solid #22c55e',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '16px'
            }}>
              <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#166534', fontWeight: '600' }}>
                🔍 Componentes da URL de Origem:
              </h4>
              <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#166534', fontWeight: '500' }}>Protocolo:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{referrerDetails.protocol}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#166534', fontWeight: '500' }}>Hostname:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{referrerDetails.hostname}</span>
                </div>
                {referrerDetails.port && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#166534', fontWeight: '500' }}>Porta:</span>
                    <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{referrerDetails.port}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#166534', fontWeight: '500' }}>Caminho:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{referrerDetails.pathname}</span>
                </div>
                {referrerDetails.search && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#166534', fontWeight: '500' }}>Query:</span>
                    <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{referrerDetails.search}</span>
                  </div>
                )}
                {referrerDetails.hash && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#166534', fontWeight: '500' }}>Hash:</span>
                    <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{referrerDetails.hash}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #22c55e', paddingTop: '8px', marginTop: '8px' }}>
                  <span style={{ color: '#166534', fontWeight: '500' }}>Origin:</span>
                  <span style={{ fontFamily: 'monospace', color: '#1e293b', fontWeight: '600' }}>{referrerDetails.origin}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resumo das URLs */}
        <div style={{ 
          background: '#f0f9ff', 
          border: '1px solid #0ea5e9',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '24px'
        }}>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', color: '#0c4a6e', fontWeight: '600' }}>
            📋 Resumo das URLs:
          </h4>
          <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#0c4a6e', fontWeight: '500' }}>URL Atual:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'monospace', color: '#1e293b', fontSize: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUrl}
                </span>
                <button 
                  onClick={() => copyToClipboard(currentUrl)}
                  style={{ 
                    background: '#0ea5e9', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    padding: '2px 6px', 
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                >
                  📋
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#0c4a6e', fontWeight: '500' }}>Página Pai:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'monospace', color: '#1e293b', fontSize: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {parentUrl}
                </span>
                {parentUrl !== 'Não está em iframe' && parentUrl !== 'Página pai não acessível (cross-origin)' && (
                  <button 
                    onClick={() => copyToClipboard(parentUrl)}
                    style={{ 
                      background: '#0ea5e9', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      padding: '2px 6px', 
                      fontSize: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    📋
                  </button>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#0c4a6e', fontWeight: '500' }}>URL de Origem:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'monospace', color: '#1e293b', fontSize: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {referrerUrl}
                </span>
                {referrerUrl !== 'Nenhum referrer disponível' && (
                  <button 
                    onClick={() => copyToClipboard(referrerUrl)}
                    style={{ 
                      background: '#0ea5e9', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      padding: '2px 6px', 
                      fontSize: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    📋
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Informações sobre URL de origem disponível */}
        {Object.keys(referrerDetails).length > 0 && (
          <div style={{ 
            background: '#f0fdf4', 
            border: '1px solid #22c55e',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '20px',
            fontSize: '14px',
            color: '#166534'
          }}>
            <strong>✅ URL de Origem Completa Disponível:</strong><br/>
            A URL da página de origem foi capturada com sucesso e todos os componentes estão disponíveis para análise.
          </div>
        )}

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
          
          {/* Link para página do Chatwoot */}
          <div style={{ 
            background: '#f0f9ff', 
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            padding: '12px',
            marginTop: '16px',
            textAlign: 'center'
          }}>
            <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#0c4a6e' }}>
              🔗 Páginas Disponíveis:
            </h4>
            <a 
              href="/chatwoot" 
              style={{ 
                display: 'inline-block',
                background: '#0ea5e9',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              📞 Chatwoot Dashboard App
            </a>
            <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px', marginBottom: 0 }}>
              Página especializada para integração com Chatwoot Dashboard Apps
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
