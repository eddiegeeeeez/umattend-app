import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:4000/v1/openapi.json', // sign up at app.heyapi.dev
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
