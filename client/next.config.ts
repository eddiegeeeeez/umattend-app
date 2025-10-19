import type { NextConfig } from 'next';

const apiBase = process.env.API_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/api/:path*`
      }
    ];
  },
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev']
};

export default nextConfig;
