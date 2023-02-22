import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Index page
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/login"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login to your account
          </Link>
          <Link to="/register" className="text-sm font-semibold text-gray-900">
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
