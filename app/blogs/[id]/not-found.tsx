import Link from "next/link";

export default function BlogNotFound() {
  return (
    <main className="page">
      <h1>Blog not found</h1>
      <p className="intro">There is no blog with this id.</p>
      <p>
        <Link href="/blogs">Back to blogs</Link>
      </p>
    </main>
  );
}
