"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, incrementBlogLikes } from "../services/blogs";

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
  const title = readField(formData, "title");
  const author = readField(formData, "author");
  const url = readField(formData, "url");

  if (!title || !author || !isHttpUrl(url)) {
    throw new Error("Title, author, and a valid http(s) URL are required.");
  }

  addBlog({ title, author, url });
  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlog(formData: FormData) {
  const rawId = formData.get("id");
  const id = typeof rawId === "string" ? Number(rawId) : Number.NaN;

  if (!Number.isInteger(id)) {
    throw new Error("A valid blog id is required.");
  }

  const blog = incrementBlogLikes(id);

  if (!blog) {
    throw new Error("Blog not found.");
  }

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
}
