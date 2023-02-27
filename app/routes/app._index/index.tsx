import { Link, useLoaderData } from '@remix-run/react';
import { json, LoaderArgs } from '@remix-run/server-runtime';
import { findUserById } from '~/models/user.server';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderArgs) {
  const userId = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const user = await findUserById(userId);
  const organisations = user?.organisations
    ? user?.organisations.map((organisation) => organisation.organisation)
    : [];

  return json({ user, organisations });
}

export default function () {
  const loaderData = useLoaderData<typeof loader>();
  console.log('loaderData', loaderData);

  return (
    <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Select organisation
        </h1>
        <p className="mt-6 mb-5 text-base leading-7 text-gray-600">
          You belong to the following organisations
        </p>
        {loaderData.organisations.map((organisation) => {
          return (
            <div
              key={organisation.id}
              className="mt-4 overflow-hidden rounded-lg border border-gray-300 text-left"
            >
              <Link
                to={`./${organisation.id}`}
                className="block px-4 py-3 hover:bg-purple-50"
              >
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {organisation.name}
                  </h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
