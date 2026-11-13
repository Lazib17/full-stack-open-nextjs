"use client";

import { useNotification } from "@/app/components/NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) {
    return null;
  }

  const notificationClasses =
    type === "success"
      ? "bg-green-600 text-white"
      : "bg-red-600 text-white";

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6">
      <div
        className={`${notificationClasses} rounded-lg px-4 py-3 shadow-sm`}
        role="status"
      >
        {message}
      </div>
    </div>
  );
}
