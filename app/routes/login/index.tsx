import { useEffect } from 'react';
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react';
import { z } from 'zod';
import { withZod } from '@remix-validated-form/with-zod';
import { safeRedirect } from 'remix-utils';
import type { LoaderArgs, ActionArgs } from '@remix-run/server-runtime';

import { wrapped } from '~/services/auth.server';
import { authenticator, FORM_STRATEGY } from '~/services/auth.server';
import { validationError } from 'remix-validated-form';

const validator = withZod(
  z.object({
    email: z.string().email().trim(),
    password: z.string().min(1).trim(),
  })
);

export async function loader({ request }: LoaderArgs) {
  const redirectTo = new URL(request.url).searchParams.get('redirectTo');

  return await authenticator.isAuthenticated(request, {
    successRedirect: safeRedirect(redirectTo, '/app/tictoc'),
  });
}

export async function action({ request }: ActionArgs) {
  const result = await validator.validate(await request.clone().formData());

  if (result.error) {
    return validationError(result.error);
  }

  const redirectTo = new URL(request.url).searchParams.get('redirectTo');

  return await wrapped(
    authenticator.authenticate(FORM_STRATEGY, request, {
      successRedirect: safeRedirect(redirectTo, '/app/tictoc'),
    })
  );
}

export function useRedirectTo() {
  const [searchParams] = useSearchParams();
  return searchParams.get('redirectTo') ?? undefined;
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData) {
      console.log(actionData);
    }
  }, [actionData]);

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
        <Form
          className="mt-8 space-y-6"
          method="post"
        >
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label
                htmlFor="email"
                className="sr-only"
              >
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
              <label
                htmlFor="password"
                className="sr-only"
              >
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
