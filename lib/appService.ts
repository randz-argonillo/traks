import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

import prisma from './prisma';

async function emailExist(email: string): Promise<Boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user !== null;
}

async function getUserByEmail(email: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}

async function createUser(data: {
  email: string;
  password: string;
  name?: string;
}): Promise<User> {
  const { email, password } = data;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });

  return user;
}

async function isValidUser(
  email: string,
  password: string
): Promise<[Boolean, User]> {
  const user = await getUserByEmail(email);
  if (user === null) {
    return [false, user];
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  return [isPasswordMatch, user];
}

export default {
  emailExist,
  createUser,
  getUserByEmail,
  isValidUser,
};
