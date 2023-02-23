import { LoaderArgs } from "@remix-run/server-runtime";
import { authenticator, GOOGLE_STRATEGY } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
  return await authenticator.authenticate(GOOGLE_STRATEGY, request, {
    successRedirect: "/app/tictoc",
    failureRedirect: "/login",
  });
}
