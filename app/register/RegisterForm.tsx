"use client";

import { useActionState } from "react";
import { registerUser, type RegisterState } from "../actions/users";
import {
  errorClass,
  fieldClass,
  formClass,
  inputClass,
  labelClass,
  primaryButtonClass,
} from "../components/styles";

const initialState: RegisterState = {};

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <form className={formClass} action={formAction}>
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
        {state.errors?.username ? (
          <p className={errorClass} role="alert">
            {state.errors.username}
          </p>
        ) : null}
      </div>
      <div className={fieldClass}>
        <label className={labelClass} htmlFor="name">
          Name
        </label>
        <input className={inputClass} id="name" name="name" type="text" required />
        {state.errors?.name ? (
          <p className={errorClass} role="alert">
            {state.errors.name}
          </p>
        ) : null}
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
        {state.errors?.password ? (
          <p className={errorClass} role="alert">
            {state.errors.password}
          </p>
        ) : null}
      </div>
      <div className={fieldClass}>
        <label className={labelClass} htmlFor="passwordConfirm">
          Confirm password
        </label>
        <input
          className={inputClass}
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          required
        />
        {state.errors?.passwordConfirm ? (
          <p className={errorClass} role="alert">
            {state.errors.passwordConfirm}
          </p>
        ) : null}
      </div>
      <button className={primaryButtonClass} type="submit">
        Register
      </button>
    </form>
  );
}
