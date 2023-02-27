import { Authenticator, AuthorizationError } from 'remix-auth';
import { sessionStorage } from '~/services/session.server';
import { FormStrategy } from 'remix-auth-form';
import { GoogleStrategy } from 'remix-auth-google';
import { compare, hash } from 'bcryptjs';

import { prisma } from '~/db.server';
import type { Password, User } from '@prisma/client';
import { environment } from '~/environment.server';

export async function hashPassword(password: string) {
  return await hash(password, 10);
}
export async function comparePassword(
  password: string,
  hash: Password['hash']
) {
  return await compare(password, hash);
}

export const FORM_STRATEGY = 'form-strategy';
export const GOOGLE_STRATEGY = 'google-strategy';

export let authenticator = new Authenticator<User['id']>(sessionStorage, {
  throwOnError: true,
});

const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get('email') as string;
  const password = form.get('password') as string;

  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    throw new AuthorizationError('404');
  }

  const isValid = await comparePassword(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    throw new AuthorizationError('401');
  }

  return userWithPassword.id;
});

const googleStrategy = new GoogleStrategy<User['id']>(
  {
    clientID: environment().GOOGLE_CLIENT_ID,
    clientSecret: environment().GOOGLE_CLIENT_SECRET,
    callbackURL: environment().GOOGLE_CALLBACK_URL,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return 'id';
  }
);

authenticator.use(formStrategy, FORM_STRATEGY);
authenticator.use(googleStrategy, GOOGLE_STRATEGY);
