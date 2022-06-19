import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

function createUserToken(user: User): string {
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      created: Date.now(),
    },
    'SECRET',
    { expiresIn: '8h' }
  );

  return token;
}

function createUserCookieToken(user: User): string {
  const userToken = createUserToken(user);

  return cookie.serialize('TRAKS_ACCESS_TOKEN', userToken, {
    httpOnly: true,
    maxAge: 8 * 60 * 60,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

export default {
  createUserToken,
  createUserCookieToken,
};
