import Link from "next/link";
import { getBlogs } from "../services/blogs";

export default function BlogsPage() {
  const blogs = getBlogs();

  return (
    <main className="page">
      <h1>Blogs</h1>
      <p className="intro">A list of blogs kept in memory by the server.</p>
      <p>
        <Link href="/blogs/new">Create a new blog</Link>
      </p>
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
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
    </main>
  );
}
