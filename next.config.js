/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'THISISASECRET'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://ec2-44-241-29-70.us-west-2.compute.amazonaws.com:3001/api/v1' // development api
      : 'http://ec2-44-241-29-70.us-west-2.compute.amazonaws.com:3001/api/v1' // production api
      // ? 'http://127.0.0.1:3001/api/v1' // development api
      // : 'http://127.0.0.1:3001/api/v1'
  }
}

module.exports = nextConfig
