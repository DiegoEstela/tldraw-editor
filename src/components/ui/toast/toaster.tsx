"use client";

import * as React from "react";
import { useToast } from "./use-toast";
import { Toast } from "./toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-full max-w-md flex-col gap-2 px-4">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          onClick={() => dismiss(toast.id)}
          className="text-left transition-opacity hover:opacity-90"
          aria-label="Cerrar notificación"
        >
          <Toast
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            size="md"
          />
        </button>
      ))}
    </div>
  );
}
