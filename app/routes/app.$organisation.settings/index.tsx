import type { LoaderArgs } from "@remix-run/server-runtime";
import { authenticator } from "~/services/auth.server";
import { getRedirectParams } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const searchParams = getRedirectParams(request);

  return await authenticator.isAuthenticated(request, {
    failureRedirect: `/login?${searchParams}`,
  });
}

export default function Settings() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            app.settings.tsx
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
}
