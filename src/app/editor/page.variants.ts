import { cva } from "class-variance-authority";

export const editorWrapper = cva("fixed inset-0 bg-background");
export const canvasLayer = cva("absolute inset-0 z-0");

export const loadingOverlay = cva(
  "pointer-events-none absolute inset-0 z-10 grid place-items-center"
);
export const loadingBox = cva(
  "rounded-md border bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow"
);

export const actionFloater = cva(
  "absolute bottom-10 right-4 z-50 flex flex-col items-end gap-2"
);

const baseFloater =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-md min-w-[180px]";

export const floaterButton = cva(
  `${baseFloater} bg-white border border-gray-300 text-gray-800 cursor-pointer transition-colors hover:bg-gray-100 hover:border-gray-400`
);

export const statusPill = cva(baseFloater, {
  variants: {
    state: {
      saving: "bg-yellow-500/90 border border-yellow-600 text-white",
      saved: "bg-green-500/90 border border-green-600 text-white",
    },
    defaultVariants: { state: "saved" },
  },
});

export const backButtonWrapper = cva(
  "absolute z-50 left-2 top-[calc(env(safe-area-inset-top,0px)+60px)]"
);
