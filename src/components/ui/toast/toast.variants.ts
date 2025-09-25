import { cva, type VariantProps } from "class-variance-authority";

export const toastVariants = cva(
  "pointer-events-auto rounded-md border bg-background p-4 shadow-md outline-none aria-live-polite",
  {
    variants: {
      variant: {
        default: "border-border ring-ring/20",
        destructive:
          "border-destructive/40 ring-destructive/20 dark:ring-destructive/40",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type ToastVariantProps = VariantProps<typeof toastVariants>;
