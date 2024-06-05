import type { Express } from 'express';
import type { CorsOptions } from 'cors';

import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import logger from '@utils/logger';
import generateRoutes from './api';

dotenv.config();

const httpStart = () => {
  const app: Express = express();
  const PORT = process.env.PORT || 1307;

  const corsConfig: CorsOptions = {
    credentials: true,
    origin: process.env.ORIGIN_URL,
  };

  app.use(json({ limit: '15mb' }));
  app.use(cookieParser());
  app.use(cors(corsConfig));

  generateRoutes(app);

  app.listen(PORT, () => {
    try {
      console.log('Server listening on port: ' + PORT);
    } catch (error) {
      logger.error('index.ts', JSON.stringify(error));
    }
  });
};

httpStart();
