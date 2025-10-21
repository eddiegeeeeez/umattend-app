import { config } from 'dotenv';
import { defineConfig } from '@hey-api/openapi-ts';

config();

export default defineConfig({
  input: {
    path: `${process.env.API_URL}/api/v1/docs/openapi.json`,
    watch: true
  },
  output: 'src/api/client',
  plugins: [
    {
      name: '@hey-api/client-axios',
      runtimeConfigPath: '../client-config'
    },
    '@tanstack/react-query', // generate TanStack Query hooks
    {
      asClass: true,
      name: '@hey-api/sdk',
      validator: 'zod'
    }
  ]
});
