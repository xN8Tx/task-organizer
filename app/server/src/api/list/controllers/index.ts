import type { Request, Response } from 'express';
import type { MyRequest } from '@models/next';

import checkUser from '@utils/check-user-list';
import listDatabase from '@db/list';
import taskDatabase from '@db/task';
import logger from '@utils/logger';

const controllers = {
  getAllByUserId: async (req: Request, res: Response) => {
    try {
      const id = (req as MyRequest).id;

      const listWithTask = await listDatabase.getAllByUserId(Number(id));

      res.status(200).json({ message: listWithTask });
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
      const { name } = req.body;
      const userId = (req as MyRequest).id;

      const postList = {
        name,
        userId: Number(userId),
      };

      const list = await listDatabase.post(postList);

      const listWithTask = {
        ...list,
        task: [],
      };

      res.status(200).json({ message: listWithTask });
    } catch (error) {
      logger.error('api/list/controllers/index.ts -> post', error as string);
      res.status(500).json({ message: 'Internal server error!' });
    }
  },
  edit: async (req: Request, res: Response) => {
    try {
      const { id, name } = req.body;
      const userId = (req as MyRequest).id;

      const isUserList = await checkUser(Number(id), Number(userId));
      if (!isUserList) throw new Error('Invalid access');

      const editList = { id: Number(id), name };
      const list = await listDatabase.edit(editList);

      res.status(200).json({ message: list });
    } catch (error) {
      logger.error('api/list/controllers/index.ts -> edit', error as string);
      res.status(500).json({ message: 'Internal server error!' });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = (req as MyRequest).id;

      const isUserList = await checkUser(Number(id), Number(userId));
      if (!isUserList) throw new Error('Invalid access');

      const list = await listDatabase.delete(Number(id));
      const task = await taskDatabase.deleteAll(Number(list.id));

      res.status(200).json({ message: { list, task } });
    } catch (error) {
      logger.error('api/list/controllers/index.ts -> delete', error as string);
      res.status(500).json({ message: 'Internal server error!' });
    }
  },
};

export default controllers;
