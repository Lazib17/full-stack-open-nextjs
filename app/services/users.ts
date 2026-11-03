import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export async function getUsers() {
  return db.query.users.findMany();
}

export async function getUserWithBlogs(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  });
}
