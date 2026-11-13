"use client";

import { primaryButtonClass } from "../components/styles";
import { generateApiToken } from "../actions/users";

export default function GenerateTokenForm() {
  return (
    <form className="mt-6" action={generateApiToken}>
      <button className={primaryButtonClass} type="submit">
        Generate New Token
      </button>
    </form>
  );
}
