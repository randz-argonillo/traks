import { NextApiRequest, NextApiResponse } from 'next';
import appService from '../../lib/appService';
import token from '../../lib/token';

export default async function Signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const [isValid, user] = await appService.isValidUser(email, password);
  if (!isValid) {
    res.status(401);
    return res.json({ error: 'Invalid username/password' });
  }

  const cookieToken = token.createUserCookieToken(user);
  res.setHeader('Set-Cookie', cookieToken);
  res.json(user);
}
