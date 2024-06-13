export type User = {
  id: number;
  name: string;
  email: string;
};

export type FullUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Task = {
  id: number;
  userId: number;
  listId: number;
  name: string;
  date: string;
  description: string;
  status: boolean;
};

export type List = {
  id: number;
  userId: number;
  name: string;
};

export type ListWithTask = Omit<List, 'userId'> & {
  task: Omit<Task, 'listId' | 'userId'>;
};
