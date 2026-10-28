import { Suspense } from "react";
import Link from "next/link";
import { getBlogs } from "../services/blogs";

export default function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="page">
          <h1>Blogs</h1>
          <p>Loading blogs...</p>
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
  const blogs = [...getBlogs()]
    .filter((blog) => blog.title.toLowerCase().includes(normalizedQuery))
    .sort((a, b) => b.likes - a.likes);

  return (
    <main className="page">
      <h1>Blogs</h1>
      <p className="intro">A list of blogs kept in memory by the server.</p>
      <p>
        <Link href="/blogs/new">Create a new blog</Link>
      </p>
      <form className="search-form" method="GET" action="/blogs">
        <div className="form-field">
          <label htmlFor="filter">Search by title</label>
          <input
            id="filter"
            name="filter"
            type="text"
            defaultValue={query}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {query.length > 0 && (
        <p>
          <Link href="/blogs">Show all blogs</Link>
        </p>
      )}
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul className="blog-list">
          {blogs.map((blog) => (
            <li key={blog.id} className="blog-card">
              <h2>
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </h2>
              <p>Author: {blog.author}</p>
              <p>
                URL:{" "}
                <a href={blog.url} target="_blank" rel="noopener noreferrer">
                  {blog.url}
                </a>
              </p>
              <p>Likes: {blog.likes}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
