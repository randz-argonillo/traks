import { NextApiRequest, NextApiResponse } from 'next';
import token from '../../lib/token';

import appService from '../../lib/appService';

export default async function Signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const emailExist = await appService.emailExist(email);
  if (emailExist) {
    res.status(400);
    return res.json({
      error: 'User already exist',
    });
  }

  const user = await appService.createUser({ email, password });
  res.setHeader('Set-Cookie', token.createUserCookieToken(user));
  res.json(user);
}
