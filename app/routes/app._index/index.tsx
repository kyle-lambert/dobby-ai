import { Link, useLoaderData } from '@remix-run/react';
import { json, LoaderArgs, redirect } from '@remix-run/server-runtime';
import { findOrganisationsByUserId } from '~/models/organisation.server';
import { findUserById } from '~/models/user.server';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderArgs) {
  const userId = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  const [user, organisations] = await Promise.all([
    await findUserById(userId),
    await findOrganisationsByUserId(userId),
  ]);

  if (organisations.length === 0) {
    return redirect('/app/create');
  }

  return json({ user, organisations });
}

export default function () {
  const loaderData = useLoaderData<typeof loader>();
  console.log('loaderData', loaderData);

  /**
   * If user doesnt exist, programmatically destroy the session
   * by submitting a form to "/auth/logout"
   */

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
