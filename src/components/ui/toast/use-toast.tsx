"use client";
/**
 * Funcionalidad: contexto global para disparar y gestionar toasts.
 * - `toast({ title, description, variant, durationMs })`
 * - `dismiss(id)`
 */
import * as React from "react";

type ToastItem = {
  id: number;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  durationMs?: number;
};

type ToastContextType = {
  toasts: ToastItem[];
  toast: (t: Omit<ToastItem, "id">) => void;
  dismiss: (id: number) => void;
};

const ToastContext = React.createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const toast = React.useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = Date.now();
      const duration = t.durationMs ?? 4000;
      setToasts((prev) => [...prev, { id, ...t }]);
      if (duration > 0) window.setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  const value = React.useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss]
  );
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
