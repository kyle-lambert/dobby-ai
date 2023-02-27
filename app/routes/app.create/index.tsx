import { Form, useActionData } from '@remix-run/react';
import { ActionArgs, LoaderArgs, redirect } from '@remix-run/server-runtime';
import { withZod } from '@remix-validated-form/with-zod';
import { validationError } from 'remix-validated-form';
import { z } from 'zod';
import { prisma } from '~/db.server';
import { authenticator } from '~/services/auth.server';
import { getSessionUserId } from '~/utils';

const validator = withZod(
  z.object({
    name: z.string().min(1).trim(),
  })
);

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: `/login`,
  });
}

export async function action({ request }: ActionArgs) {
  const result = await validator.validate(await request.clone().formData());

  if (result.error) {
    return validationError(result.error);
  }

  const organisation = await prisma.organisation.create({
    data: {
      name: result.data.name,
      users: {
        create: {
          user: {
            connect: {
              id: await getSessionUserId(request),
            },
          },
        },
      },
    },
  });

  return redirect(`/app/${organisation.id}`);
}

export default function Create() {
  const actionData = useActionData<typeof action>();
  console.log('actionData', actionData);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create organisation
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You don't belong to any organisations yet, create one here!
          </p>
        </div>
        <Form className="mt-8 space-y-6" method="post">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Name"
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
