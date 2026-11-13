import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import GenerateTokenForm from "./GenerateTokenForm";
import MarkAsReadForm from "./MarkAsReadForm";
import {
  linkClass,
  narrowPageClass,
  panelClass,
  titleClass,
} from "../components/styles";
import { getReadingList } from "../services/readingList";
import { getCurrentUser } from "../services/session";

export default function MePage() {
  return (
    <Suspense
      fallback={
        <main className={narrowPageClass}>
          <p className="text-gray-600">Loading profile...</p>
        </main>
      }
    >
      <Profile />
    </Suspense>
  );
}

async function Profile() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const entries = await getReadingList(user.id);
  const unread = entries.filter((entry) => entry.blog && !entry.read);
  const read = entries.filter((entry) => entry.blog && entry.read);

  return (
    <main className={narrowPageClass}>
      <section className={panelClass}>
        <h1 className={titleClass}>My Profile</h1>
        <dl className="mt-6 space-y-4">
          <div>
            <dt className="font-semibold text-gray-900">Name</dt>
            <dd className="mt-1 text-gray-700">{user.name}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Username</dt>
            <dd className="mt-1 text-gray-700">{user.username}</dd>
          </div>
        </dl>
        <hr className="my-6 border-gray-200" />
        <h2 className="text-xl font-semibold text-gray-900">Reading List</h2>
        <h3 className="mt-6 text-lg font-semibold text-gray-900">
          Unread ({unread.length})
        </h3>
        {unread.length === 0 ? (
          <p className="mt-3 text-gray-600">No unread blogs.</p>
        ) : (
          <ul className="mt-3 flex list-none flex-col gap-3 p-0">
            {unread.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-col gap-3 rounded-lg bg-amber-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <Link className={linkClass} href={`/blogs/${entry.blog.id}`}>
                  {entry.blog.title}
                </Link>
                <MarkAsReadForm blogId={entry.blog.id} />
              </li>
            ))}
          </ul>
        )}
        <h3 className="mt-6 text-lg font-semibold text-gray-900">
          Read ({read.length})
        </h3>
        {read.length === 0 ? (
          <p className="mt-3 text-gray-600">No blogs marked as read yet.</p>
        ) : (
          <ul className="mt-3 flex list-none flex-col gap-3 p-0">
            {read.map((entry) => (
              <li
                key={entry.id}
                className="rounded-lg bg-green-50 px-4 py-3"
              >
                <Link className={linkClass} href={`/blogs/${entry.blog.id}`}>
                  {entry.blog.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <hr className="my-6 border-gray-200" />
        <h2 className="text-xl font-semibold text-gray-900">API Token</h2>
        {user.token ? (
          <div className="mt-4">
            <p className="font-semibold text-gray-900">Current token:</p>
            <p className="mt-2 break-all rounded-md bg-gray-100 px-3 py-2 font-mono text-sm text-gray-800">
              {user.token}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-gray-600">
            No API token has been generated yet.
          </p>
        )}
        <GenerateTokenForm />
      </section>
    </main>
  );
}
