import type { List, ListWithTask } from '@models/database';

export type PostList = Omit<List, 'id'>;
export type EditList = Omit<List, 'userId'>;

export type ListDatabase = {
  get: (id: number) => Promise<List>;
  getAllByUserId: (userId: number) => Promise<ListWithTask[]>;
  post: (list: PostList) => Promise<List>;
  edit: (list: EditList) => Promise<List>;
  delete: (id: number) => Promise<List>;
};
