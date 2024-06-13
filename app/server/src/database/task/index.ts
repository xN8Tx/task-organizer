import type { TaskDatabase, PostTask, EditTask } from './index.d';
import type { Task } from '@models/database';

import databaseConnector from '@db/database-connector';

const taskDatabase: TaskDatabase = {
  async get(id: number) {
    try {
      const databaseResponse = await databaseConnector.query<Task>(
        'SELECT * FROM task WHERE id = $1',
        [id],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not get data from task.');
    }
  },
  async post(task: PostTask) {
    try {
      const { listId, userId, name, description } = task;
      const date = new Date().toLocaleString();

      const databaseResponse = await databaseConnector.query<Task>(
        'INSERT INTO task ("listId", "userId", name, description, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [listId, userId, name, description, date],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not post data from task.');
    }
  },
  async edit(task: EditTask) {
    try {
      const { id, status, name, description } = task;

      const databaseResponse = await databaseConnector.query<Task>(
        'UPDATE task SET status = $2, name = $3, description = $4 WHERE id = $1 RETURNING *',
        [id, status, name, description],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not edit data from task.');
    }
  },
  async delete(id: number) {
    try {
      const databaseResponse = await databaseConnector.query<Task>(
        'DELETE FROM task WHERE id = $1 RETURNING *',
        [id],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not delete data from task.');
    }
  },
  async deleteAll(listId: number) {
    try {
      const databaseResponse = await databaseConnector.query<Task>(
        'DELETE FROM task WHERE "listId" = $1 RETURNING *',
        [listId],
      );

      return databaseResponse.rows;
    } catch (error) {
      throw new Error('Can not deleteAll data from task.');
    }
  },
};

export default taskDatabase;
