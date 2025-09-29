import { cva, type VariantProps } from "class-variance-authority";

export const wrapperVariants = cva(
  "relative min-h-screen flex flex-col overflow-hidden bg-background text-foreground",
  {
    variants: {
      glow: {
        on: "[background:radial-gradient(80rem_40rem_at_50%_-20%,hsl(var(--primary)/0.14),transparent_60%)]",
        off: "",
      },
      bg: {
        none: "",
        subtle: "bg-gradient-to-b from-background via-background to-background",
        halo: [
          "bg-gradient-to-b from-background via-background to-background",
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-[30rem]",
          "before:bg-[radial-gradient(45rem_20rem_at_50%_-10%,hsl(var(--foreground)/0.08),transparent_60%)]",
        ].join(" "),
      },
    },
    defaultVariants: { glow: "on", bg: "halo" },
  }
);

export const themeToggleWrapperVariants = cva(
  "absolute right-4 top-4 z-50 flex items-center gap-2"
);

export const themeToggleLabelVariants = cva(
  "hidden select-none text-xs text-muted-foreground sm:block"
);

export const containerVariants = cva(
  "mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-20 md:py-28 flex-1",
  {
    variants: {
      align: {
        center: "items-center text-center",
        left: "items-start text-left",
      },
      size: { md: "", lg: "gap-10 md:py-32" },
    },
    defaultVariants: { align: "center", size: "md" },
  }
);

export const headerVariants = cva("space-y-4");

export const titleVariants = cva("tracking-tight", {
  variants: {
    size: { md: "text-3xl md:text-5xl", lg: "text-4xl md:text-6xl" },
  },
  defaultVariants: { size: "md" },
});

export const subtitleVariants = cva(
  "mx-auto max-w-prose text-base text-muted-foreground"
);

export const kbdVariants = cva(
  "rounded-md border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground shadow-sm",
  {
    variants: {
      tone: {
        default: "",
        brand: "border-primary/30 bg-primary/5 text-primary",
      },
    },
    defaultVariants: { tone: "default" },
  }
);

export const chipsVariants = cva(
  "flex flex-wrap gap-2 text-xs text-muted-foreground",
  {
    variants: { align: { center: "justify-center", left: "" } },
    defaultVariants: { align: "center" },
  }
);

export const chipItemVariants = cva("rounded-full border px-3 py-1");

export const actionsVariants = cva("flex items-center gap-3", {
  variants: { align: { center: "justify-center", left: "" } },
  defaultVariants: { align: "center" },
});

export const ctaButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3",
    "font-semibold tracking-tight text-base md:text-lg",
    "shadow-lg ring-1 ring-black/5 transition-all active:scale-[0.99]",
    "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
    "hover:from-primary/90 hover:to-primary/70",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
  ].join(" ")
);

export const footerVariants = cva(
  "mt-auto w-full border-t bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60"
);

export const footerInnerVariants = cva(
  "mx-auto flex max-w-5xl items-center justify-between px-6 py-3 text-xs text-muted-foreground"
);

export type WelcomeVariantProps = VariantProps<typeof wrapperVariants> &
  VariantProps<typeof containerVariants> &
  VariantProps<typeof titleVariants> &
  VariantProps<typeof kbdVariants> &
  VariantProps<typeof chipsVariants> &
  VariantProps<typeof actionsVariants> &
  VariantProps<typeof footerVariants>;
