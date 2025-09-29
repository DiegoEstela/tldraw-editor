/**
 * Tiempo de espera en milisegundos para aplicar debounce
 * al guardado automático del snapshot del editor.
 */
export const SAVE_DEBOUNCE_MS = 500;

/**
 * Tiempo máximo en milisegundos que se muestra la pantalla
 * de carga inicial antes de ocultarla (fallback visual).
 */
export const LOAD_TIMEOUT_MS = 1500;

/**
 * Configuración de formas de ejemplo utilizadas en el demo.
 * - geo: tipo de figura soportada por tldraw ("rectangle", "ellipse", etc.)
 * - w: ancho inicial de la figura
 * - h: alto inicial de la figura
 * - label: texto descriptivo que se muestra en toasts y UI
 */
export const SHAPE_CONFIGS = [
  { geo: "rectangle" as const, w: 220, h: 140, label: "rectángulo" },
  { geo: "rectangle" as const, w: 160, h: 160, label: "cuadrado" },
  { geo: "ellipse" as const, w: 160, h: 160, label: "círculo" },
];

// Tamaños mínimos/máximos permitidos (por si los reutilizas)
export const SIZE_MIN = 20;
export const SIZE_MAX = 1200;

// Tamaños por defecto
export const DEFAULT_RECT_W = 160;
export const DEFAULT_RECT_H = 100;
export const DEFAULT_SQUARE_SIZE = 160;

// Escalas semánticas (para "pequeño/mediano/grande")
export const SIZE_SMALL = 100;
export const SIZE_MEDIUM = 160;
export const SIZE_LARGE = 240;

// Formas y colores permitidos (tipos server-safe)
export const GEO_VALUES = [
  "rectangle",
  "ellipse",
  "triangle",
  "diamond",
  "star",
  "heart",
] as const;
export type GeoValue = (typeof GEO_VALUES)[number];

export const COLOR_VALUES = [
  "black",
  "grey",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
] as const;
export type ColorValue = (typeof COLOR_VALUES)[number];
