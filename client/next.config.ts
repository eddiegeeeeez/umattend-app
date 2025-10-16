import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*'
      }
    ];
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev']
};

export default nextConfig;
