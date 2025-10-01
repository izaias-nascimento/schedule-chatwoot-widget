/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para Docker
  output: 'standalone',
  // Configurações para permitir iframe
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
