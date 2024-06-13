import type { List, ListWithTask } from '@models/database';
import type { ListDatabase, PostList, EditList } from './index.d';

import databaseConnector from '@db/database-connector';

const listDatabase: ListDatabase = {
  async get(id: number) {
    try {
      const databaseResponse = await databaseConnector.query(
        'SELECT * FROM list WHERE id = $1',
        [id],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not get all by userId data from list.');
    }
  },
  async getAllByUserId(userId: number) {
    try {
      const databaseResponse = await databaseConnector.query<ListWithTask>(
        `SELECT l.id AS id, l.name AS name, (SELECT json_agg(json_build_object('id', t.id,'name', t.name,'description', t.description,'date', t.date,'status', t.status)) FROM task t WHERE t."listId" = l.id) AS tasks FROM list l WHERE l."userId" = $1`,
        [userId],
      );

      return databaseResponse.rows;
    } catch (error) {
      throw new Error('Can not get all by userId data from list.');
    }
  },
  async post(list: PostList) {
    try {
      const { userId, name } = list;

      const databaseResponse = await databaseConnector.query<List>(
        'INSERT INTO list ("userId", name) VALUES ($1, $2) RETURNING *',
        [userId, name],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not post data from list.');
    }
  },
  async delete(id: number) {
    try {
      const databaseResponse = await databaseConnector.query<List>(
        'DELETE FROM list WHERE id = $1 RETURNING *',
        [id],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not delete data from list.');
    }
  },
  async edit(list: EditList) {
    try {
      const { name, id } = list;

      const databaseResponse = await databaseConnector.query<List>(
        'UPDATE list SET name = $1 WHERE id = $2 RETURNING *',
        [name, id],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not edit data from list.');
    }
  },
};

export default listDatabase;
