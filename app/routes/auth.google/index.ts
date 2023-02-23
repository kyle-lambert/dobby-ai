import { ActionArgs, LoaderArgs, redirect } from '@remix-run/server-runtime';
import { authenticator, GOOGLE_STRATEGY } from '~/services/auth.server';

export async function loader({ request }: LoaderArgs) {
  return redirect('/login');
}

export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate(GOOGLE_STRATEGY, request);
}
