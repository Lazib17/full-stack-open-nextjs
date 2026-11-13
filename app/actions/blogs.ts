"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { addBlog, getBlogById, incrementBlogLikes } from "../services/blogs";
import {
  addReadingListEntry,
  isInReadingList,
  markReadingListEntryRead,
} from "../services/readingList";
import { getCurrentUser } from "../services/session";

function readRaw(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export type BlogFormState = {
  errors?: {
    title?: string;
    author?: string;
    url?: string;
  };
  values?: {
    title: string;
    author: string;
    url: string;
  };
  success?: boolean;
};

export async function createBlog(
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const title = readRaw(formData, "title");
  const author = readRaw(formData, "author");
  const url = readRaw(formData, "url");
  const errors: NonNullable<BlogFormState["errors"]> = {};

  if (!title || title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }

  if (!author || author.trim().length < 5) {
    errors.author = "Author must be at least 5 characters long";
  }

  if (!url || url.trim().length < 5) {
    errors.url = "URL must be at least 5 characters long";
  } else if (!isHttpUrl(url.trim())) {
    errors.url = "URL must be a valid http(s) address";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
      success: false,
    };
  }

  const blog = await addBlog({
    title: title.trim(),
    author: author.trim(),
    url: url.trim(),
    userId: user.id,
  });
  await addReadingListEntry(user.id, blog.id);
  revalidatePath("/blogs");
  revalidatePath("/users");
  revalidatePath("/users/[username]", "page");

  return {
    errors: {},
    values: { title, author, url },
    success: true,
  };
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
    candidate.message.includes("reading_list_user_id_blog_id_unique")
  ) {
    return true;
  }

  return isUniqueViolation(candidate.cause);
}

export async function addToReadingList(formData: FormData) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const rawId = formData.get("blogId");
  const blogId = typeof rawId === "string" ? Number(rawId) : Number.NaN;

  if (!Number.isInteger(blogId)) {
    throw new Error("A valid blog id is required.");
  }

  const blog = await getBlogById(blogId);

  if (!blog) {
    throw new Error("Blog not found.");
  }

  if (blog.userId !== user.id && !(await isInReadingList(user.id, blog.id))) {
    try {
      await addReadingListEntry(user.id, blog.id);
    } catch (error) {
      if (!isUniqueViolation(error)) {
        throw error;
      }
    }
  }

  revalidatePath(`/blogs/${blog.id}`);
}

export async function markAsRead(formData: FormData) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const rawId = formData.get("blogId");
  const blogId = typeof rawId === "string" ? Number(rawId) : Number.NaN;

  if (!Number.isInteger(blogId)) {
    throw new Error("A valid blog id is required.");
  }

  await markReadingListEntryRead(user.id, blogId);
  revalidatePath("/me");
}
