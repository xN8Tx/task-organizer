import type { FullUser, User } from '@models/database';
import type { PostUser } from '@models/request';
import type { UserDatabase } from './index.d';

import databaseConnector from '../database-connector';

const userDatabase: UserDatabase = {
  get: async (userId: number) => {
    try {
      const databaseResponse = await databaseConnector.query<User>(
        'SELECT id, name, email FROM "user" WHERE id = $1',
        [userId],
      );

      return databaseResponse.rows;
    } catch (error) {
      throw new Error('Can not get data from user.');
    }
  },
  getByEmail: async (email: string) => {
    try {
      const databaseResponse = await databaseConnector.query<FullUser>(
        'SELECT * FROM "user" WHERE email = $1',
        [email],
      );

      return databaseResponse.rows;
    } catch (error) {
      throw new Error('Can not get data from user.');
    }
  },
  post: async (user: PostUser) => {
    try {
      const { name, email, password } = user;

      const databaseResponse = await databaseConnector.query<User>(
        'INSERT INTO "user" (email, name, password) VALUES ($1, $2, $3) RETURNING (id, email, name)',
        [email, name, password],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not post data from user.');
    }
  },
  edit: async (user: FullUser) => {
    try {
      const { email, name, password, id } = user;

      const databaseResponse = await databaseConnector.query<User>(
        'UPDATE "user" SET (email = $1, name = $2, password = $3) WHERE (id = $4)  RETURNING (id, email, name)',
        [email, name, password, id],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not post data from user.');
    }
  },
  delete: async (userId: number) => {
    try {
      const databaseResponse = await databaseConnector.query<User>(
        'DELETE FROM "user" WHERE id = $1 RETURNING (id, email, name)',
        [userId],
      );

      return databaseResponse.rows[0];
    } catch (error) {
      throw new Error('Can not post data from user.');
    }
  },
};

export default userDatabase;
