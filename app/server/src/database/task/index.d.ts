import type { Task } from '@models/database';

export type PostTask = Omit<Task, 'id' | 'date' | 'status'>;
export type EditTask = Omit<Task, 'userId' | 'listId' | 'date'>;

export type TaskDatabase = {
  get: (id: number) => Promise<Task>;
  post: (task: PostTask) => Promise<Task>;
  edit: (task: EditTask) => Promise<Task>;
  delete: (id: number) => Promise<Task>;
  deleteAll: (listId: number) => Promise<Task[]>;
};
