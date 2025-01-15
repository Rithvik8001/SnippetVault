// components/ToastProvider.tsx
"use client";
import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "white",
          border: "1px solid #E5E7EB",
          borderRadius: "0.75rem",
        },
        className: "my-toast-class",
      }}
    />
  );
}
