import { cva } from "class-variance-authority";

export const aiWrapper = cva(
  "pointer-events-auto absolute z-50 top-[calc(env(safe-area-inset-top,0px)+20px)] left-1/2 -translate-x-1/2"
);

export const aiPanel = cva(
  "w-[820px] max-w-[96vw] rounded-md border bg-background/90 backdrop-blur " +
    "px-4 py-2 shadow-md flex items-center gap-3"
);

export const aiInput = cva(
  "flex-1 bg-transparent outline-none text-base md:text-[17px] " +
    "placeholder:text-muted-foreground"
);

export const aiButton = cva(
  "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium " +
    "min-w-[64px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
);
