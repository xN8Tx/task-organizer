import type { Request, Response } from 'express';

export type Controllers = {
  signin: (req: Request, res: Response) => Promise<void>;
  registration: (req: Request, res: Response) => Promise<void>;
  getMe: (req: Request, res: Response) => Promise<void>;
  refresh: (req: Request, res: Response) => Promise<void>;
  logout: (req: Request, res: Response) => Promise<void>;
};
