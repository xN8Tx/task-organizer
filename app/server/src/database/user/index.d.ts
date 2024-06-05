import type { FullUser, User } from '@models/database';
import type { PostUser } from '@models/request';

export type UserDatabase = {
  get: (userId: number) => Promise<User[]>;
  getByEmail: (email: string) => Promise<FullUser[]>;
  post: (user: PostUser) => Promise<User>;
  edit: (user: FullUser) => Promise<User>;
  delete: (userId: number) => Promise<User>;
};
