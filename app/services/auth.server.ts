import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { compare } from "bcryptjs";

import { prisma } from "~/db.server";
import type { User } from "@prisma/client";
import { json } from "@remix-run/server-runtime";

export async function wrapped(authenticate: Promise<User["id"]>) {
  try {
    return await authenticate;
  } catch (error) {
    /**
     * Because redirects work by throwing a Response, we need to check
     * if the caught error is a Response and return it.
     */
    if (error instanceof Response) {
      return error;
    }
    if (error instanceof AuthorizationError) {
      const message = error.message || "Authorization error.";
      return json({ error: message }, 403);
    }

    return json({ error: "Server error." }, 500);
  }
}

export const FORM_STRATEGY = "form-strategy";
export const GOOGLE_STRATEGY = "google-strategy";

export let authenticator = new Authenticator<User["id"]>(sessionStorage, {
  throwOnError: true,
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const userWithPassword = await prisma.user.findUnique({
      where: { email },
      include: {
        password: true,
      },
    });

    if (!userWithPassword || !userWithPassword.password) {
      throw new AuthorizationError("User does not exist.");
    }

    const isValid = await compare(password, userWithPassword.password.hash);

    if (!isValid) {
      throw new AuthorizationError("Invalid credentials.");
    }

    return userWithPassword.id;
  }),
  FORM_STRATEGY
);