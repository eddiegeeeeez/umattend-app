import express from 'express';
import { apiReference } from '@scalar/express-api-reference';
import { NODE_ENV } from '@/constants/app.constants';
import { auth } from '../docs/auth.docs';
import { user } from '../docs/user.docs';
import { event } from '../docs/event.docs';
import { Request, Response } from 'express';

const router = express.Router();

const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'UMAttend API',
    version: '1.0.0',
    description: 'API documentation for UMAttend application',
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API v1',
    },
  ],
  paths: {
    ...auth,
    ...user,
    ...event,
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
      },
    },
  },
};

if (NODE_ENV === 'PRODUCTION') {
  router.use((req: Request, res: Response) => {
    res.status(403).json({
      error: 'Documentation is not available in production environment',
    });
  });
}

router.get('/openapi.json', (req: Request, res: Response) => {
  res.json(openApiSpec);
});

router.use(
  '/',
  apiReference({
    theme: 'deepSpace',
    spec: {
      content: openApiSpec,
    },
  } as Parameters<typeof apiReference>[0])
);

export default router;
