/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'THISISASECRET'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'https://admin.nakib.xyz/api/v1' // development api
      : 'https://admin.nakib.xyz/api/v1' // production api
      // ? 'http://127.0.0.1:3001/api/v1' // development api
      // : 'http://127.0.0.1:3001/api/v1'
  }
}

module.exports = nextConfig
