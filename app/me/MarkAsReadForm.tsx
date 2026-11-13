"use client";

import { markAsRead } from "../actions/blogs";

export default function MarkAsReadForm({ blogId }: { blogId: number }) {
  return (
    <form action={markAsRead}>
      <input type="hidden" name="blogId" value={blogId} />
      <button
        className="inline-flex w-fit shrink-0 cursor-pointer items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        type="submit"
      >
        Mark as read
      </button>
    </form>
  );
}
