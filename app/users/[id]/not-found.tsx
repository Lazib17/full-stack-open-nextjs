import Link from "next/link";

export default function UserNotFound() {
  return (
    <main className="page">
      <h1>User not found</h1>
      <p className="intro">There is no user with this id.</p>
      <p>
        <Link href="/users">Back to users</Link>
      </p>
    </main>
  );
}
