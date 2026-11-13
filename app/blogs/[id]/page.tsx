import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { addToReadingList, likeBlog } from "../../actions/blogs";
import {
  linkClass,
  metaClass,
  pageClass,
  panelClass,
  primaryButtonClass,
  titleClass,
} from "../../components/styles";
import { getBlogById } from "../../services/blogs";
import { isInReadingList } from "../../services/readingList";
import { getCurrentUser } from "../../services/session";

export default function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={<p className={`${pageClass} text-gray-600`}>Loading blog...</p>}
    >
      <BlogDetails params={params} />
    </Suspense>
  );
}

async function BlogDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogId = Number(id);

  if (!Number.isInteger(blogId)) {
    notFound();
  }

  const blog = await getBlogById(blogId);

  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();
  const canAddToReadingList = Boolean(user && user.id !== blog.userId);
  const alreadyInReadingList =
    user && canAddToReadingList
      ? await isInReadingList(user.id, blog.id)
      : false;

  return (
    <main className={pageClass}>
      <p>
        <Link className={linkClass} href="/blogs">
          Back to blogs
        </Link>
      </p>
      <article className={`${panelClass} mt-4`}>
        <h1 className={titleClass}>{blog.title}</h1>
        <p className={`${metaClass} text-base`}>Author: {blog.author}</p>
        <p className={`${metaClass} break-words text-base`}>
          URL:{" "}
          <a
            className={linkClass}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.url}
          </a>
        </p>
        <p className={`${metaClass} text-base`}>Likes: {blog.likes}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <form action={likeBlog}>
            <input type="hidden" name="id" value={blog.id} />
            <button className={primaryButtonClass} type="submit">
              Like
            </button>
          </form>
          {canAddToReadingList && alreadyInReadingList ? (
            <p className="text-sm font-semibold text-green-800">
              Already in reading list
            </p>
          ) : null}
          {canAddToReadingList && !alreadyInReadingList ? (
            <form action={addToReadingList}>
              <input type="hidden" name="blogId" value={blog.id} />
              <button
                className="inline-flex w-fit cursor-pointer items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                type="submit"
              >
                Add to reading list
              </button>
            </form>
          ) : null}
        </div>
      </article>
    </main>
  );
}
