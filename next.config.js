/** @type {import('next').NextConfig} */
const SERVER = process.env.API_URL

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
  }
}
