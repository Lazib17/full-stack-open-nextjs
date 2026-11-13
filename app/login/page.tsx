"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  errorClass,
  fieldClass,
  formClass,
  inputClass,
  labelClass,
  narrowPageClass,
  panelClass,
  primaryButtonClass,
  titleClass,
} from "../components/styles";

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
    <main className={narrowPageClass}>
      <section className={panelClass}>
        <h1 className={titleClass}>Login</h1>
        {error ? <p className={`${errorClass} mt-4`}>{error}</p> : null}
        <form className={formClass} onSubmit={handleSubmit}>
          <div className={fieldClass}>
            <label className={labelClass} htmlFor="username">
              Username
            </label>
            <input
              className={inputClass}
              id="username"
              name="username"
              type="text"
              required
            />
          </div>
          <div className={fieldClass}>
            <label className={labelClass} htmlFor="password">
              Password
            </label>
            <input
              className={inputClass}
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <button className={primaryButtonClass} type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
