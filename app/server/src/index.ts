import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import type { Express } from 'express';
import type { CorsOptions } from 'cors';

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

  app.listen(PORT, () => {
    try {
      console.log('Server listening on port: ' + PORT);
    } catch (error) {
      console.log('Htpp server can not start', JSON.stringify(error));
    }
  });
};

httpStart();
