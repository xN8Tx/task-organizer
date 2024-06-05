import type { Express } from 'express';
import authRouter from './auth';

const generateRoutes = (app: Express) => {
  app.use(authRouter);
};

export default generateRoutes;
