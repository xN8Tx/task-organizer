import type { MyRequest } from '@models/next';
import type { JwtPayload } from '@models/request';
import type { NextFunction, Response, Request } from 'express';

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import logger from '@utils/logger';

dotenv.config();

const clearCookies = (res: Response) => {
  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
  return res.status(401).json({ message: 'Invalid token' });
};

const verifyJwtToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['accessToken'];

    if (!token) return clearCookies(res);

    const accessToken: string = process.env.ACCESS_TOKEN_SECRET as string;
    if (!accessToken) throw new Error('SECRET_TOKKEN is undefinded');

    jwt.verify(token, accessToken, (error: unknown, user: unknown) => {
      if (error) return clearCookies(res);
      const { id } = user as JwtPayload;

      (req as MyRequest).id = Number(id);
      next();
    });
  } catch (error) {
    logger.error('middleware/verify-jwt-token/index.ts', JSON.stringify(error));
  }
};

export default verifyJwtToken;
