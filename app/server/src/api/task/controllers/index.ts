import type { Request, Response } from 'express';
import type { EditTask, PostTask } from '@db/task/index.d';
import type { MyRequest } from '@models/next';

import checkUserList from '@utils/check-user-list';
import checkUserTask from '@utils/check-user-task';

import logger from '@utils/logger';
import taskDatabase from '@db/task';

const controllers = {
  get: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = Number((req as MyRequest).id);

      const database = await taskDatabase.get(Number(id));
      const databaseUserId = Number(database.userId);

      if (!database) return res.status(404).json({ message: 'Not found' });
      if (databaseUserId !== userId)
        return res.status(403).json({ message: 'Invalid access' });

      res.status(200).json({ message: database });
    } catch (error) {
      logger.error(
        'api/list/controllers/index.ts -> getAllByUserId',
        error as string,
      );
      res.status(500).json({ message: 'Internal server error!' });
    }
  },
  post: async (req: Request, res: Response) => {
    try {
      const { listId, name, description } = req.body;
      const userId = (req as MyRequest).id;

      const isUserList = await checkUserList(Number(listId), Number(userId));
      if (!isUserList)
        return res.status(403).json({ message: 'Invalid access' });

      const newTask: PostTask = {
        userId,
        listId,
        name,
        description,
      };

      const database = await taskDatabase.post(newTask);
      if (!database)
        throw new Error(
          `Can not create new task. Task: ${JSON.stringify(newTask)}`,
        );

      res.status(200).json({ message: database });
    } catch (error) {
      logger.error(
        'api/list/controllers/index.ts -> getAllByUserId',
        error as string,
      );
      res.status(500).json({ message: 'Internal server error!' });
    }
  },
  edit: async (req: Request, res: Response) => {
    try {
      const { id, name, status, description } = req.body;
      const userId = (req as MyRequest).id;

      const isUserTask = await checkUserTask(Number(id), Number(userId));
      if (!isUserTask)
        return res.status(403).json({ message: 'Invalid access' });

      const newTask: EditTask = {
        id,
        status,
        name,
        description,
      };

      const database = await taskDatabase.edit(newTask);
      if (!database)
        throw new Error(
          `Can not create new task. Task: ${JSON.stringify(newTask)}`,
        );

      res.status(200).json({ message: database });
    } catch (error) {
      logger.error(
        'api/list/controllers/index.ts -> getAllByUserId',
        error as string,
      );
      res.status(500).json({ message: 'Internal server error!' });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = (req as MyRequest).id;

      const isUserTask = await checkUserTask(Number(id), Number(userId));
      if (!isUserTask)
        return res.status(403).json({ message: 'Invalid access' });

      const database = await taskDatabase.delete(Number(id));
      if (!database) throw new Error(`Can not delete task by id. ID: ${id}`);

      res.status(200).json({ message: database });
    } catch (error) {
      logger.error(
        'api/list/controllers/index.ts -> getAllByUserId',
        error as string,
      );
      res.status(500).json({ message: 'Internal server error!' });
    }
  },
};

export default controllers;
