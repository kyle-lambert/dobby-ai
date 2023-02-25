import { Form, Link, useActionData, useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { withZod } from '@remix-validated-form/with-zod';
import { safeRedirect } from 'remix-utils';
import {
  LoaderArgs,
  ActionArgs,
  json,
  redirect,
} from '@remix-run/server-runtime';

import { authenticator, FORM_STRATEGY } from '~/services/auth.server';
import { validationError } from 'remix-validated-form';
import { AuthorizationError } from 'remix-auth';
import { commitSession, getSession } from '~/services/session.server';
import { prisma } from '~/db.server';
import { httpStatus } from '~/utils/errors';

const validator = withZod(
  z.object({
    email: z.string().email().trim(),
    password: z.string().min(1).trim(),
  })
);

export async function loader({ request }: LoaderArgs) {
  const redirectTo = new URL(request.url).searchParams.get('redirectTo');

  const userId = await authenticator.isAuthenticated(request);

  if (userId) {
    const organisations = await prisma.organisation.findMany({
      where: {
        users: {
          every: {
            userId,
          },
        },
      },
    });

    if (organisations.length > 0) {
      const organisation = organisations[0];
      return redirect(
        safeRedirect(redirectTo, `/app/${organisation.id}/dashboard`)
      );
    }

    return redirect(safeRedirect(redirectTo, '/app/create'));
  }

  return json({});
}

export async function action({ request }: ActionArgs) {
  const result = await validator.validate(await request.clone().formData());

  if (result.error) {
    return validationError(result.error);
  }

  const redirectTo = new URL(request.url).searchParams.get('redirectTo');

  try {
    const userId = await authenticator.authenticate(FORM_STRATEGY, request, {});

    const session = await getSession(request.headers.get('Cookie'));
    session.set(authenticator.sessionKey, userId);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        organisations: {
          include: {
            organisation: true,
          },
        },
      },
    });

    const headers = {
      'Set-Cookie': await commitSession(session),
    };

    console.log(JSON.stringify(user, null, 4));

    if (user?.organisations && user.organisations.length > 0) {
      const organisationId = user.organisations[0].organisationId;
      return redirect(
        safeRedirect(redirectTo, `/app/${organisationId}/dashboard`),
        { headers }
      );
    }

    return redirect(safeRedirect(redirectTo, '/app/create'), {
      headers,
    });
  } catch (error) {
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

export default function Login() {
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();

  console.log('loaderData', loaderData);
  console.log('actionData', actionData);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create one here
            </Link>
          </p>
        </div>
        <Form className="mt-8 space-y-6" method="post">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* <input type="hidden" name="redirectTo" value={redirectTo} /> */}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
