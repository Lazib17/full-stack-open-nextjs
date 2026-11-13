import Link from "next/link";
import { linkClass, mutedClass, pageClass, titleClass } from "../../components/styles";

export default function BlogNotFound() {
  return (
    <main className={pageClass}>
      <h1 className={titleClass}>Blog not found</h1>
      <p className={mutedClass}>There is no blog with this id.</p>
      <p className="mt-4">
        <Link className={linkClass} href="/blogs">
          Back to blogs
        </Link>
      </p>
    </main>
  );
}
