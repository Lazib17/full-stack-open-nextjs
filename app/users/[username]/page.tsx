import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cardClass,
  cardListClass,
  cardTitleLinkClass,
  emptyClass,
  metaClass,
  pageClass,
  sectionTitleClass,
  titleClass,
} from "../../components/styles";
import { getUserWithBlogs } from "../../services/users";

export default function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return (
    <Suspense
      fallback={<p className={`${pageClass} text-gray-600`}>Loading user...</p>}
    >
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
    <main className={pageClass}>
      <h1 className={titleClass}>{user.name}</h1>
      <p className="mt-2 text-gray-600">Username: {user.username}</p>
      <h2 className={sectionTitleClass}>Blogs</h2>
      {blogs.length === 0 ? (
        <p className={emptyClass}>This user has no blogs.</p>
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
              <p className={metaClass}>Likes: {blog.likes}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
