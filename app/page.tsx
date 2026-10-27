import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <h1>Full Stack Open — Blog Application</h1>
      <p className="intro">This is my first Next.js blog exercise.</p>
      <p>
        <Link href="/blogs">View the blogs</Link>
      </p>
    </main>
  );
}
