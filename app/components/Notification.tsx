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
    <div className="mx-auto w-full max-w-[40rem] px-5 pt-4">
      <div
        className={`${notificationClasses} mb-3 rounded px-4 py-3`}
        role="status"
      >
        {message}
      </div>
    </div>
  );
}
