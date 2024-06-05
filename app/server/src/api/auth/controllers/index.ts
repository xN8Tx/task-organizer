import type { Controllers } from './index.d';
import type { MyRequest } from '@models/next';
import type { JwtPayload, PostUser } from '@models/request';
import type { Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import logger from '@utils/logger';
import userDatabase from '@db/user';

import createJwtCookies from './utils/create-jwt-cookies';

const controllers: Controllers = {
  signin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Get user by email
      const userByEmailResponse = await userDatabase.getByEmail(email);

      // Chech is password correct
      const isPasswordCorrect = password === userByEmailResponse[0].password;

      // Check is user exist and password correct
      if (userByEmailResponse.length !== 1 || !isPasswordCorrect)
        throw new Error('Email or password incorrect!');

      // Create JWT and setup JWT tokens to HTTP-only cookies
      createJwtCookies(userByEmailResponse[0].id, res);

      res.status(200).json({ message: 'Successfuly signin!' });
    } catch (error) {
      logger.error(
        'api/auth/controllers/index.ts -> signin',
        JSON.stringify(error),
      );
    }
  },
  registration: async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      // Check is Email uniqe
      console.log('1');
      const userByEmailResponse = await userDatabase.getByEmail(email);
      console.log('2');
      if (userByEmailResponse.length !== 0) throw new Error('Email is exist!');

      // Create user
      const newUser: PostUser = { email, password, name };
      const postUserResponse = await userDatabase.post(newUser);

      // Create JWT and setup JWT tokens to HTTP-only cookies
      createJwtCookies(postUserResponse.id, res);

      res.status(200).json({ message: 'Successfuly create user' });
    } catch (error) {
      logger.error(
        'api/auth/controllers/index.ts -> registration',
        JSON.stringify(error),
      );
    }
  },
  getMe: async (req: Request, res: Response) => {
    try {
      const userId = (req as MyRequest).id;

      const userResponser = await userDatabase.get(userId);
      if (!userResponser || userResponser.length !== 1)
        throw new Error('User doesnt exist');

      res.status(200).json({ message: userResponser[0] });
    } catch (error) {
      logger.error(
        'api/auth/controllers/index.ts -> getMe',
        JSON.stringify(error),
      );
      res.status(500).json({ message: error });
    }
  },
  refresh: async (req: Request, res: Response) => {
    try {
      const refreshToken = (req as MyRequest).cookies.refreshToken;
      if (!refreshToken) throw new Error('Token is empty');

      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
      if (!refreshTokenSecret) throw new Error('REFRESH_TOKEN_SECRET is empty');

      jwt.verify(refreshToken, refreshTokenSecret, (error, user) => {
        if (error) {
          res.clearCookie('refreshToken');
          res.clearCookie('accessToken');
          throw new Error(`Can not verify token by IP:${req.ip}`);
        }

        createJwtCookies((user as JwtPayload).id, res);

        res.status(200).json({ message: 'Successfuly refresh token' });
      });
    } catch (error) {
      logger.error(
        'api/auth/controllers/index.ts -> refresh',
        JSON.stringify(error),
      );
      res.status(500).json({ message: error });
    }
  },
  logout: async (_, res: Response) => {
    try {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.status(200).json({ message: 'Successfuly logout' });
    } catch (error) {
      logger.error(
        'api/auth/controllers/index.ts -> logout',
        JSON.stringify(error),
      );
      res.status(500).json({ message: error });
    }
  },
};

export default controllers;
