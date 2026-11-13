import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import GenerateTokenForm from "./GenerateTokenForm";
import {
  narrowPageClass,
  panelClass,
  titleClass,
} from "../components/styles";
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
