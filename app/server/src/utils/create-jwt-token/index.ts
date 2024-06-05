import jwt from 'jsonwebtoken';

import type { Secret } from 'jsonwebtoken';

const createJWTToken = (id: number) => {
  const user = { id };

  const accessToken: string = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: '30m',
    },
  );

  const refreshToken: string = jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET as Secret,
    {
      expiresIn: '30d',
    },
  );

  return { accessToken, refreshToken };
};

export default createJWTToken;
