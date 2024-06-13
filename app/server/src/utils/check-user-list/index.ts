import listDatabase from '@db/list';

const checkUserList = async (id: number, userId: number) => {
  const databaseResponse = await listDatabase.get(id);

  const databaseUserId = Number(databaseResponse.userId);
  if (databaseUserId === userId) return true;
  return false;
};

export default checkUserList;
