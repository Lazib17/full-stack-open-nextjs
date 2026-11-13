import { Suspense } from "react";
import Link from "next/link";
import {
  cardClass,
  cardListClass,
  cardTitleLinkClass,
  emptyClass,
  inputClass,
  labelClass,
  linkClass,
  metaClass,
  mutedClass,
  pageClass,
  primaryButtonClass,
  titleClass,
} from "../components/styles";
import { getBlogs } from "../services/blogs";

export default function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  return (
    <Suspense
      fallback={
        <main className={pageClass}>
          <h1 className={titleClass}>Blogs</h1>
          <p className={mutedClass}>Loading blogs...</p>
        </main>
      }
    >
      <BlogList searchParams={searchParams} />
    </Suspense>
  );
}

function readFilter(filter: string | string[] | undefined): string {
  const value = Array.isArray(filter) ? filter[0] : filter;
  return value?.trim() ?? "";
}

async function BlogList({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  const { filter } = await searchParams;
  const query = readFilter(filter);
  const normalizedQuery = query.toLowerCase();
  const blogs = (await getBlogs())
    .filter((blog) => blog.title.toLowerCase().includes(normalizedQuery))
    .sort((a, b) => b.likes - a.likes);

  return (
    <main className={pageClass}>
      <h1 className={titleClass}>Blogs</h1>
      <p className={mutedClass}>A list of blogs stored in PostgreSQL.</p>
      <p className="mt-4">
        <Link className={linkClass} href="/blogs/new">
          Create a new blog
        </Link>
      </p>
      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end"
        method="GET"
        action="/blogs"
      >
        <div className="flex w-full max-w-md flex-col gap-1.5">
          <label className={labelClass} htmlFor="filter">
            Search by title
          </label>
          <input
            className={inputClass}
            id="filter"
            name="filter"
            type="text"
            defaultValue={query}
          />
        </div>
        <button className={primaryButtonClass} type="submit">
          Search
        </button>
      </form>
      {query.length > 0 && (
        <p className="mt-4">
          <Link className={linkClass} href="/blogs">
            Show all blogs
          </Link>
        </p>
      )}
      {blogs.length === 0 ? (
        <p className={emptyClass}>No blogs found.</p>
      ) : (
        <ul className={cardListClass}>
          {blogs.map((blog) => (
            <li key={blog.id} className={cardClass}>
              <h2>
                <Link className={cardTitleLinkClass} href={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </h2>
              <p className={metaClass}>Author: {blog.author}</p>
              <p className={`${metaClass} break-words`}>
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
              <p className={metaClass}>Likes: {blog.likes}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
