import { Authenticator, AuthorizationError } from 'remix-auth';
import { sessionStorage } from '~/services/session.server';
import { FormStrategy } from 'remix-auth-form';
import { GoogleStrategy } from 'remix-auth-google';
import { compare, hash } from 'bcryptjs';

import { prisma } from '~/db.server';
import type { Password, User } from '@prisma/client';
import { json } from '@remix-run/server-runtime';
import { environment } from '~/environment.server';
import { httpStatus } from '~/utils/errors';

export async function hashPassword(password: string) {
  return await hash(password, 10);
}
export async function comparePassword(
  password: string,
  hash: Password['hash']
) {
  return await compare(password, hash);
}

export async function wrapped(authenticate: Promise<User['id']>) {
  try {
    return await authenticate;
  } catch (error) {
    /**
     * Because redirects work by throwing a Response, we need to check
     * if the caught error is a Response and return it.
     */
    if (error instanceof Response) {
      return error;
    }
    if (error instanceof AuthorizationError) {
      const message = error.message || httpStatus[403];
      return json({ error: message }, 403);
    }

    return json({ error: httpStatus[500] }, 500);
  }
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
    throw new AuthorizationError('User does not exist');
  }

  const isValid = await comparePassword(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    throw new AuthorizationError('Invalid credentials');
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
