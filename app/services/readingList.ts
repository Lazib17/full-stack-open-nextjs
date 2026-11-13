import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { readingList } from "@/db/schema";

export async function isInReadingList(userId: number, blogId: number) {
  const entry = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, userId),
      eq(readingList.blogId, blogId),
    ),
  });

  return Boolean(entry);
}

export async function addReadingListEntry(userId: number, blogId: number) {
  await db.insert(readingList).values({ userId, blogId });
}
