"use client";

import { useActionState } from "react";
import { registerUser, type RegisterState } from "../actions/users";

const initialState: RegisterState = {};

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <form className="blog-form" action={formAction}>
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" required />
        {state.errors?.username ? (
          <p className="form-error" role="alert">
            {state.errors.username}
          </p>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />
        {state.errors?.name ? (
          <p className="form-error" role="alert">
            {state.errors.name}
          </p>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />
        {state.errors?.password ? (
          <p className="form-error" role="alert">
            {state.errors.password}
          </p>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="passwordConfirm">Confirm password</label>
        <input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          required
        />
        {state.errors?.passwordConfirm ? (
          <p className="form-error" role="alert">
            {state.errors.passwordConfirm}
          </p>
        ) : null}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
