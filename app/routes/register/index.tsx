import { Form, Link, useActionData, useCatch, useLoaderData } from '@remix-run/react';
import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/server-runtime';
import { withZod } from '@remix-validated-form/with-zod';
import { safeRedirect } from 'remix-utils';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { findOrganisationsByUserId } from '~/models/organisation.server';
import { createUser, findUserByEmail } from '~/models/user.server';
import { authenticator } from '~/services/auth.server';
import { commitSession } from '~/services/session.server';
import { getSearchParams, jsonHttpResponse, setSessionUserId } from '~/utils';

const validator = withZod(
  z.object({
    firstName: z.string().min(1).trim(),
    lastName: z.string().min(1).trim(),
    email: z.string().email(),
    password: z.string().min(1).trim(),
  })
);

export async function loader({ request }: LoaderArgs) {
  const userId = await authenticator.isAuthenticated(request);

  if (!userId) {
    return json({});
  }

  const redirectTo = await getSearchParams(request, 'redirectTo');
  const organisations = await findOrganisationsByUserId(userId);

  return organisations.length > 0
    ? redirect(safeRedirect(redirectTo, '/app'))
    : redirect(safeRedirect(redirectTo, '/app/create'));
}

export async function action({ request }: ActionArgs) {
  const result = await validator.validate(await request.clone().formData());

  if (result.error) {
    return validationError(result.error);
  }

  if (await findUserByEmail(result.data.email)) {
    return jsonHttpResponse(409, 'User already exists');
  }

  const user = await createUser(result.data);
  const session = await setSessionUserId(request, user.id);

  return redirect(`/app/create`, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Register() {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  console.log('loader data', loaderData);
  console.log('action data', actionData);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already registered?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in here
            </Link>
          </p>
        </div>
        <Form className="mt-8 space-y-6" method="post">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Last name"
              />
            </div>
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
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
