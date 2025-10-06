import express, { Response, Request } from 'express';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

import cors from 'cors';
import path from 'path';
import helmet from 'helmet';

import { errorHandler, notFound } from './v1/middlewares/error.middleware';
import { cacheControl } from './v1/middlewares/cacheControl.middleware';

import userRoutes from './v1/routes/user.routes';
import authRoutes from './v1/routes/auth.routes';
import eventRoutes from './v1/routes/event.routes';
import { NODE_ENV } from './constants/app.constants';

const app = express();

// ---------- SECURITY & PERFORMANCE MIDDLEWARE ----------
app.set('trust proxy', 1);
app.use(helmet());
app.use(cacheControl);
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ---------- CORS CONFIGURATION ----------
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', "http://192.168.0.100:3000"];
app.use(
  cors({
    origin: (origin: string | undefined, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

// ---------- API ROUTES ----------
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/event', eventRoutes);

// ---------- SERVE FRONTEND (only in production) ----------
if (NODE_ENV === 'PRODUCTION') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const distPath = path.join(__dirname, '../client/dist');
  app.use(express.static(distPath));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

if (NODE_ENV !== 'PRODUCTION') {
  app.get('/api', (req: Request, res: Response) => {
    res.send('API is running...');
  });
}

// ---------- 404 HANDLER ----------
app.use(notFound);

// ---------- ERROR HANDLER ----------
app.use(errorHandler);

export default app;
