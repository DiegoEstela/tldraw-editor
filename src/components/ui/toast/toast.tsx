"use client";

import { cn } from "@/lib/utils";
import { toastVariants, type ToastVariantProps } from "./toast.variants";

type ToastProps = {
  title?: string;
  description?: string;
} & ToastVariantProps;

export function Toast({ title, description, variant, size }: ToastProps) {
  return (
    <div
      className={cn(toastVariants({ variant, size }))}
      role="status"
      aria-live="polite"
    >
      {title ? <p className="font-medium">{title}</p> : null}
      {description ? (
        <p className="text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export { toastVariants, type ToastVariantProps };
