import { createCookieSessionStorage } from '@remix-run/node';
import { environment } from '~/environment.server';

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [environment().SESSION_SECRET],
    secure: environment().NODE_ENV === 'production',
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
