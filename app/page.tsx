import Link from "next/link";
import { linkClass, mutedClass, pageClass, titleClass } from "./components/styles";

export default function Home() {
  return (
    <main className={pageClass}>
      <h1 className={titleClass}>Full Stack Open — Blog Application</h1>
      <p className={mutedClass}>This is my first Next.js blog exercise.</p>
      <p className="mt-4">
        <Link className={linkClass} href="/blogs">
          View the blogs
        </Link>
      </p>
    </main>
  );
}
