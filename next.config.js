/** @type {import('next').NextConfig} */
const SERVER = process.env.SERVER_URL

module.exports = () => {
  const rewrites = async () => [
    {
      source: '/api/:path*',
      destination: `${SERVER}/:path*`,
    },
  ]

  return {
    reactStrictMode: true,
    rewrites,
    images: {
      domains: ['minio.zhj13.com', '139.84.171.31'],
      loader: 'default',
    },
  }
}
