import { and, asc, eq } from "drizzle-orm";
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

export async function getReadingList(userId: number) {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blog: true },
    orderBy: [asc(readingList.id)],
  });
}

export async function markReadingListEntryRead(userId: number, blogId: number) {
  const rows = await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)))
    .returning();

  return rows[0] ?? null;
}
