import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TLGeoShape } from "tldraw";
import { SHAPE_CONFIGS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Detecta si la forma es una geo de tldraw
export function isGeoShape(shape: unknown): shape is TLGeoShape {
  return (
    !!shape && typeof shape === "object" && (shape as TLGeoShape).type === "geo"
  );
}

// Índice aleatorio distinto del actual para no repetir formas
export function randomDifferentIndex(len: number, exclude: number): number {
  if (len <= 1) return 0;
  let idx = exclude;
  while (idx === exclude) idx = Math.floor(Math.random() * len);
  return idx;
}

// Dado un `geo`, encuentra el índice en SHAPE_CONFIGS
export function indexByGeo(geo: string): number {
  const i = SHAPE_CONFIGS.findIndex((cfg) => cfg.geo === geo);
  return i >= 0 ? i : 0;
}
