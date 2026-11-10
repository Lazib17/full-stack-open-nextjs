import { Suspense } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="page">
          <h1>Register</h1>
          <p>Loading registration...</p>
        </main>
      }
    >
      <RegisterForm searchParams={searchParams} />
    </Suspense>
  );
}

function readError(error: string | string[] | undefined): string {
  const value = Array.isArray(error) ? error[0] : error;

  if (value === "taken") {
    return "That username is already taken.";
  }

  if (value === "missing") {
    return "Username, name, and password are required.";
  }

  return "";
}

async function RegisterForm({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const { error } = await searchParams;
  const message = readError(error);

  return (
    <main className="page">
      <h1>Register</h1>
      {message ? <p className="form-error">{message}</p> : null}
      <form className="blog-form" action={registerUser}>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" required />
        </div>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
