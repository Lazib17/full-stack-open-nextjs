"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getCurrentUser } from "../services/session";

export type RegisterState = {
  errors?: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
  };
};

function readText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function readPassword(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function isUniqueViolation(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as {
    code?: string;
    message?: string;
    cause?: unknown;
  };

  if (candidate.code === "23505") {
    return true;
  }

  if (
    typeof candidate.message === "string" &&
    candidate.message.includes("users_username_unique")
  ) {
    return true;
  }

  return isUniqueViolation(candidate.cause);
}

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const username = readText(formData, "username");
  const name = readText(formData, "name");
  const password = readPassword(formData, "password");
  const passwordConfirm = readPassword(formData, "passwordConfirm");
  const errors: NonNullable<RegisterState["errors"]> = {};

  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  }

  if (!name) {
    errors.name = "Name is required";
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = "Password confirmation is required";
  } else if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  if (!errors.username) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (existingUser) {
      errors.username = "This username is already taken";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      username,
      name,
      passwordHash,
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { errors: { username: "This username is already taken" } };
    }

    throw error;
  }

  revalidatePath("/users");
  redirect("/login");
}

export async function generateApiToken() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const newToken = crypto.randomUUID();

  await db
    .update(users)
    .set({ token: newToken })
    .where(eq(users.id, currentUser.id));

  revalidatePath("/me");
}
