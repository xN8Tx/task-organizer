import type { User } from './database';

export type JwtPayload = {
  id: number;
};

export type PostUser = Omit<User, 'id'> & {
  password: string;
};
