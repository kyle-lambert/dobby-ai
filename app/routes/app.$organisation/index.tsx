import { Fragment, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Form,
  Link,
  Outlet,
  ThrownResponse,
  useCatch,
  useLoaderData,
} from '@remix-run/react';
import { json, LoaderArgs } from '@remix-run/server-runtime';
import clsx from 'clsx';
import { authenticator } from '~/services/auth.server';

import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { getRedirectParams } from '~/utils';
import { prisma } from '~/db.server';
import {
  httpStatus,
  HttpStatusCode,
  HttpStatusName,
  jsonHttpError,
} from '~/utils/errors';
import { Request } from '@remix-run/node';
import { Organisation, User } from '@prisma/client';

// export async function authenticated(request: Request) {
//   const searchParams = getRedirectParams(request);
//   const userId = await authenticator.isAuthenticated(request, {
//     failureRedirect: `/login?${searchParams}`,
//   });
// }

export async function findUserOrganisation(
  userId: User['id'],
  organisationId: Organisation['id']
) {
  return await prisma.userOrganisation.findUnique({
    where: {
      userId_organisationId: {
        userId,
        organisationId,
      },
    },
    include: {
      user: {
        include: {
          organisations: {
            include: {
              organisation: true,
            },
          },
        },
      },
      organisation: true,
    },
  });
}

export async function loader({ request, params }: LoaderArgs) {
  // const searchParams = getRedirectParams(request);
  // const userId = await authenticator.isAuthenticated(request, {
  //   failureRedirect: `/login?${searchParams}`,
  // });
  const userId = await authenticator.isAuthenticated(request, {
    failureRedirect: `/login`,
  });

  const organisationId = params.organisation as string;

  const userOrganisation = await findUserOrganisation(userId, organisationId);

  if (!userOrganisation) {
    throw jsonHttpError(403, 'User does not belong to this organisation');
  }

  return json({
    user: userOrganisation.user,
    organisation: userOrganisation.organisation,
  });
}

const navigation = [
  { name: 'Dashboard', to: './dashboard' },
  { name: 'Settings', to: './settings' },
];
const userNavigation = [{ name: 'Settings', to: './settings' }];

export default function App() {
  const data = useLoaderData<typeof loader>();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link to=".">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <span className="h-8 w-8 rounded-full bg-green-500 " />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.to}
                                  className={clsx(
                                    active ? 'bg-gray-100' : '',
                                    'block w-full px-4 py-2 text-left text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            {({ active }) => (
                              <Form action="/auth/logout" method="post">
                                <button
                                  type="submit"
                                  className={clsx(
                                    active ? 'bg-gray-100' : '',
                                    'block w-full px-4 py-2 text-left text-sm text-gray-700'
                                  )}
                                >
                                  Sign out
                                </button>
                              </Form>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.to}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div>
                    <div className="text-base font-medium leading-none text-white">
                      Bob
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      Joans
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.to}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                  <Form action="/auth/logout" method="post">
                    <button
                      type="submit"
                      className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign out
                    </button>
                  </Form>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Outlet />
    </div>
  );
}

export type CatchJsonHttpError = {
  error: {
    code: HttpStatusCode;
    name: HttpStatusName;
    message: string | null;
  };
};

export function CatchBoundary() {
  const { status, data } = useCatch() as ThrownResponse<
    number,
    CatchJsonHttpError
  >;
  const error = data?.error;

  return (
    <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-rose-600">{status}</p>
        {error?.name && (
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {error.name}
          </h1>
        )}
        {error?.message && (
          <p className="mt-6 text-base leading-7 text-gray-600">
            {error.message}
          </p>
        )}
      </div>
    </main>
  );
}
