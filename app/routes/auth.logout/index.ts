import { ActionArgs, LoaderArgs, redirect } from '@remix-run/server-runtime';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderArgs) {
  return redirect('/login');
}

export async function action({ request }: ActionArgs) {
  return await authenticator.logout(request, {
    redirectTo: '/login',
  });
}
