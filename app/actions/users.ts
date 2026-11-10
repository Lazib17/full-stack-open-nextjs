"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

function readText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
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

export async function registerUser(formData: FormData) {
  const username = readText(formData, "username");
  const name = readText(formData, "name");
  const passwordValue = formData.get("password");
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!username || !name || !password) {
    redirect("/register?error=missing");
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    redirect("/register?error=taken");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  let usernameTaken = false;

  try {
    await db.insert(users).values({
      username,
      name,
      passwordHash,
    });
  } catch (error) {
    if (!isUniqueViolation(error)) {
      throw error;
    }

    usernameTaken = true;
  }

  if (usernameTaken) {
    redirect("/register?error=taken");
  }

  revalidatePath("/users");
  redirect("/login");
}
