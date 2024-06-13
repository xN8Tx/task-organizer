import type { Express } from 'express';

import authRouter from './auth';
import listRouter from './list';
import taskRouter from './task';

const generateRoutes = (app: Express) => {
  app.use('/api/auth', authRouter);
  app.use('/api/list', listRouter);
  app.use('/api/task', taskRouter);
};

export default generateRoutes;
