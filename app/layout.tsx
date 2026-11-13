import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import AuthSessionProvider from "@/app/components/SessionProvider";
import NavBar from "@/app/components/NavBar";
import Notification from "@/app/components/Notification";
import { NotificationProvider } from "@/app/components/NotificationContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full Stack Open — Blog Application",
  description: "Exercise 1 blog list for the Full Stack Open Next.js course",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-gray-50 text-gray-900">
        <AuthSessionProvider>
          <NotificationProvider>
            <Suspense
              fallback={
                <header className="h-16 border-b border-gray-200 bg-white shadow-sm" />
              }
            >
              <NavBar />
            </Suspense>
            <Notification />
            {children}
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
