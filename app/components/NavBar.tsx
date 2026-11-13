"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/users", label: "Users" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/blogs") {
    return (
      pathname === "/blogs" ||
      (pathname.startsWith("/blogs/") && pathname !== "/blogs/new")
    );
  }

  if (href === "/blogs/new") {
    return pathname === "/blogs/new";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean) {
  return active
    ? "rounded-md bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-700"
    : "rounded-md px-2 py-1 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-indigo-700";
}

export default function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-2 gap-y-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="mr-2 text-lg font-bold tracking-tight text-gray-900 sm:mr-4"
        >
          Blog
        </Link>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={navLinkClass(isCurrent(pathname, link.href))}
            aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        {session ? (
          <Link
            href="/blogs/new"
            className={navLinkClass(isCurrent(pathname, "/blogs/new"))}
            aria-current={isCurrent(pathname, "/blogs/new") ? "page" : undefined}
          >
            Create
          </Link>
        ) : null}
        <div className="ml-auto flex items-center gap-3">
          {session ? (
            <>
              <span className="max-w-40 truncate text-sm text-gray-600">
                {session.user?.name}
              </span>
              <button
                type="button"
                onClick={() => signOut()}
                className="inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={navLinkClass(isCurrent(pathname, "/login"))}
                aria-current={isCurrent(pathname, "/login") ? "page" : undefined}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
