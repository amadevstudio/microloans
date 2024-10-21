/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // dev
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      // Prod local rendering
      {
        protocol: 'http',
        hostname: '172.17.0.1',
        port: '1337',
        pathname: '/uploads/**'
      },
      // Prod from-user query
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CMS_BASE_URL,
        pathname: '/uploads/**',
      }
    ],
  },
};

export default nextConfig;
