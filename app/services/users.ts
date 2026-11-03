import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export async function getUsers() {
  return db.query.users.findMany();
}

export async function getUserById(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  });
}

export async function getUserWithBlogs(id: number) {
  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      blogs: true,
    },
  });
}
