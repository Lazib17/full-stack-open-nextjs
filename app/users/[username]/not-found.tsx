import Link from "next/link";
import { linkClass, mutedClass, pageClass, titleClass } from "../../components/styles";

export default function UserNotFound() {
  return (
    <main className={pageClass}>
      <h1 className={titleClass}>User not found</h1>
      <p className={mutedClass}>There is no user with this username.</p>
      <p className="mt-4">
        <Link className={linkClass} href="/users">
          Back to users
        </Link>
      </p>
    </main>
  );
}