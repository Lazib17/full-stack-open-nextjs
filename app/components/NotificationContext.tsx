"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type NotificationType = "success" | "error";

type NotificationContextType = {
  message: string;
  type: NotificationType;
  showNotification: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");
  const timeoutRef = useRef<number | null>(null);

  const showNotification = useCallback(
    (msg: string, notifType: NotificationType = "success") => {
      setMessage(msg);
      setType(notifType);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setMessage("");
        timeoutRef.current = null;
      }, 5000);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ message, type, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
