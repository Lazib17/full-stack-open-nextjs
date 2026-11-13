import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { likeBlog } from "../../actions/blogs";
import {
  linkClass,
  metaClass,
  pageClass,
  panelClass,
  primaryButtonClass,
  titleClass,
} from "../../components/styles";
import { getBlogById } from "../../services/blogs";

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
        <form className="mt-6" action={likeBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <button className={primaryButtonClass} type="submit">
            Like
          </button>
        </form>
      </article>
    </main>
  );
}
