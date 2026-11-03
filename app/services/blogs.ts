import { eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs, users } from "../../db/schema";

export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
  userId: number;
};

export async function getBlogs(): Promise<Blog[]> {
  return db.select().from(blogs);
}

export async function getBlogById(id: number): Promise<Blog | undefined> {
  const rows = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
  return rows[0];
}

export async function addBlog(input: {
  title: string;
  author: string;
  url: string;
}): Promise<Blog> {
  const [user] = await db
    .select()
    .from(users)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  if (!user) {
    throw new Error("Add a user before creating a blog.");
  }

  const rows = await db
    .insert(blogs)
    .values({
      title: input.title,
      author: input.author,
      url: input.url,
      likes: 0,
      userId: user.id,
    })
    .returning();

  const blog = rows[0];

  if (!blog) {
    throw new Error("The blog could not be saved.");
  }

  return blog;
}

export async function incrementBlogLikes(
  id: number,
): Promise<Blog | undefined> {
  const rows = await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
    .returning();

  return rows[0];
}
