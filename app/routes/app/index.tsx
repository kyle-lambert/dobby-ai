import { Outlet } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { authenticator } from "~/services/auth.server";
import { getRedirectParams } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const searchParams = getRedirectParams(request);

  return await authenticator.isAuthenticated(request, {
    failureRedirect: `/login?${searchParams}`,
  });
}

export default function Index() {
  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}
