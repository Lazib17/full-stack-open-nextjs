import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getUsers } from "../services/users";

export default function UsersPage() {
  return (
    <Suspense
      fallback={
        <main className="page">
          <h1>Users</h1>
          <p>Loading users...</p>
        </main>
      }
    >
      <UserList />
    </Suspense>
  );
}

async function UserList() {
  await connection();
  const users = await getUsers();

  return (
    <main className="page">
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="blog-list">
          {users.map((user) => (
            <li key={user.id} className="blog-card">
              <h2>
                <Link href={`/users/${user.id}`}>{user.name}</Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
