import { config } from 'dotenv';
import { defineConfig } from '@hey-api/openapi-ts';

config();

export default defineConfig({
  input: `${process.env.API_URL}/docs/openapi.json`,
  output: 'src/api/client',
  plugins: [
    {
      asClass: false,
      name: '@hey-api/sdk'
    },
    '@tanstack/react-query',
    'zod',
    '@hey-api/client-axios'
  ]
});
