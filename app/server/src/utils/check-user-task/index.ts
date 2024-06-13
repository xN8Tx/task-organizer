import taskDatabase from '@db/task';

const checkUserTask = async (id: number, userId: number) => {
  const database = await taskDatabase.get(id);
  const databaseUserId = Number(database.userId);

  if (databaseUserId === userId) return true;
  return false;
};

export default checkUserTask;
