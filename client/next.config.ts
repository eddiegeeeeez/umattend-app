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

  turbopack: {
    root: __dirname // force Next.js to treat `client/` as the root
  }
};

export default nextConfig;
