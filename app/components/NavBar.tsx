"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <header className="site-header">
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/blogs">Blogs</Link>
        <Link href="/users">Users</Link>
        {session ? (
          <>
            <span>{session.user?.name}</span>
            <button type="button" onClick={() => signOut()}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">login</Link>
        )}
      </nav>
    </header>
  );
}
