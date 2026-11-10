"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { addBlog, incrementBlogLikes } from "../services/blogs";
import { getCurrentUser } from "../services/session";

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function createBlog(formData: FormData) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const title = readField(formData, "title");
  const author = readField(formData, "author");
  const url = readField(formData, "url");

  if (!title || !author || !isHttpUrl(url)) {
    throw new Error("Title, author, and a valid http(s) URL are required.");
  }

  await addBlog({ title, author, url, userId: user.id });
  revalidatePath("/blogs");
  revalidatePath("/users");
  revalidatePath("/users/[username]", "page");
  redirect("/blogs");
}

export async function likeBlog(formData: FormData) {
  const rawId = formData.get("id");
  const id = typeof rawId === "string" ? Number(rawId) : Number.NaN;

  if (!Number.isInteger(id)) {
    throw new Error("A valid blog id is required.");
  }

  const blog = await incrementBlogLikes(id);

  if (!blog) {
    throw new Error("Blog not found.");
  }

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
  revalidatePath("/users");
  revalidatePath("/users/[username]", "page");
}
