"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="page">
      <h1>Login</h1>
      {error ? <p className="form-error">{error}</p> : null}
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" required />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
