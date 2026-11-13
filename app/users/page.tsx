import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import {
  cardClass,
  cardListClass,
  cardTitleLinkClass,
  emptyClass,
  pageClass,
  titleClass,
} from "../components/styles";
import { getUsers } from "../services/users";

export default function UsersPage() {
  return (
    <Suspense
      fallback={
        <main className={pageClass}>
          <h1 className={titleClass}>Users</h1>
          <p className="mt-2 text-gray-600">Loading users...</p>
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
    <main className={pageClass}>
      <h1 className={titleClass}>Users</h1>
      {users.length === 0 ? (
        <p className={emptyClass}>No users found.</p>
      ) : (
        <ul className={cardListClass}>
          {users.map((user) => (
            <li key={user.id} className={cardClass}>
              <h2>
                <Link
                  className={cardTitleLinkClass}
                  href={`/users/${user.username}`}
                >
                  {user.name}
                </Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
