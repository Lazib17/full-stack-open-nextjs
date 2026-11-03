import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../services/users";

export default function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return (
    <Suspense fallback={<p className="page">Loading user...</p>}>
      <UserDetails params={params} />
    </Suspense>
  );
}

async function UserDetails({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  const blogs = [...user.blogs].sort((a, b) => b.likes - a.likes);

  return (
    <main className="page">
      <h1>{user.name}</h1>
      <p>Username: {user.username}</p>
      <h2>Blogs</h2>
      {blogs.length === 0 ? (
        <p>This user has no blogs.</p>
      ) : (
        <ul className="blog-list">
          {blogs.map((blog) => (
            <li key={blog.id} className="blog-card">
              <h2>
                <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              </h2>
              <p>Author: {blog.author}</p>
              <p>Likes: {blog.likes}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
