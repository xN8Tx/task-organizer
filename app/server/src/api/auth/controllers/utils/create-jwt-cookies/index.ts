import type { Response } from 'express';
import createJWTToken from '@utils/create-jwt-token';

const createJwtCookies = (userId: number, res: Response) => {
  // Create JWT
  const { accessToken, refreshToken } = createJWTToken(Number(userId));

  // Setup JWT tokens to HTTP-only cookies
  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.cookie('accessToken', accessToken, {
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
  });
};

export default createJwtCookies;
