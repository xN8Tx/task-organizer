import type { CookieOptions, Request } from 'express';

interface MyCookie extends CookieOptions {
  refreshToken: string;
}

type MyRequest = Request & {
  id: number;
  cookies: MyCookie;
};
