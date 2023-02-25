import { LoaderArgs } from '@remix-run/server-runtime';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderArgs) {
  // const searchParams = getRedirectParams(request);
  // const userId = await authenticator.isAuthenticated(request, {
  //   failureRedirect: `/login?${searchParams}`,
  // });
  return await authenticator.isAuthenticated(request, {
    failureRedirect: `/login`,
  });
}

export default function Create() {
  return <div>app.create</div>;
}
