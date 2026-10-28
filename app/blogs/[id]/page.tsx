import { Suspense } from "react";
import { notFound } from "next/navigation";
import { likeBlog } from "../../actions/blogs";
import { getBlogById } from "../../services/blogs";

export default function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p className="page">Loading blog...</p>}>
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

  const blog = getBlogById(blogId);

  if (!blog) {
    notFound();
  }

  return (
    <main className="page">
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>
        URL:{" "}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>Likes: {blog.likes}</p>
      <form className="like-form" action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </main>
  );
}
