import { User } from '@prisma/client';
import { prisma } from '~/db.server';
import { hashPassword } from '~/services/auth.server';

import type { With } from '~/types';

export async function findUserByEmail(email: User['email']) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserById(userId: User['id']) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

type CreateUser = With<User, 'firstName' | 'lastName' | 'email'> & {
  password: string;
};

export async function createUser({
  firstName,
  lastName,
  email,
  password,
}: CreateUser) {
  const hash = await hashPassword(password);
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: {
        create: {
          hash,
        },
      },
    },
  });
}
