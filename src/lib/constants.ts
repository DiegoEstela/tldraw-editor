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
