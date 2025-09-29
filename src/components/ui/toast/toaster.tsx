"use client";

import * as React from "react";
import { useToast } from "./use-toast";
import { Toast } from "./toast";
import { toasterButton, toasterWrapper } from "./toast.variants";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className={toasterWrapper()}>
      {toasts.map((toast) => (
        <button
          key={toast.id}
          onClick={() => dismiss(toast.id)}
          className={toasterButton()}
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
