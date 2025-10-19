// TODO migrate the endpoints to secrets
import type { NextConfig } from 'next';

const apiBase = process.env.API_URL;

const nextConfig: NextConfig = {
  output: 'standalone',
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
