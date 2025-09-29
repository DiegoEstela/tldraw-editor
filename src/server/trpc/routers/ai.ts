import { z } from "zod";
import { router, publicProcedure } from "../core";
import {
  SIZE_MAX,
  SIZE_MIN,
  DEFAULT_RECT_W,
  DEFAULT_RECT_H,
  SIZE_SMALL,
  SIZE_MEDIUM,
  SIZE_LARGE,
  type ColorValue,
  type GeoValue,
} from "@/lib/constants";

type Shape = {
  geo: GeoValue;
  w: number;
  h: number;
  label?: string;
  color: ColorValue;
};

function clamp(n: unknown, min = SIZE_MIN, max = SIZE_MAX): number {
  const v = Number(n);
  if (!Number.isFinite(v)) return min;
  return Math.max(min, Math.min(max, v));
}

function detectGeoFromPrompt(prompt: string): GeoValue | null {
  const p = prompt.toLowerCase();
  if (/\b(círculo|circulo|circle)\b/.test(p)) return "ellipse";
  if (/\b(cuadrado|square)\b/.test(p)) return "rectangle";
  if (/\b(triángulo|triangulo|triangle)\b/.test(p)) return "triangle";
  if (/\b(diamante|diamond)\b/.test(p)) return "diamond";
  if (/\b(estrella|star)\b/.test(p)) return "star";
  if (/\b(rectángulo|rectangulo|rectangle)\b/.test(p)) return "rectangle";
  if (/\b(corazón|corazon|heart)\b/.test(p)) return "heart";
  return null;
}

function detectColorFromPrompt(prompt: string): ColorValue | null {
  const p = prompt.toLowerCase();
  if (/\b(rojo|red)\b/.test(p)) return "red";
  if (/\b(azul|blue)\b/.test(p)) return "blue";
  if (/\b(verde|green)\b/.test(p)) return "green";
  if (/\b(amarillo|yellow)\b/.test(p)) return "yellow";
  if (/\b(naranja|orange)\b/.test(p)) return "orange";
  if (/\b(violeta|morado|purple|violet)\b/.test(p)) return "violet";
  if (/\b(gris|gray|grey)\b/.test(p)) return "grey";
  if (/\b(negro|black)\b/.test(p)) return "black";
  return null;
}

function detectSizeFromPrompt(
  prompt: string
): { w?: number; h?: number; size?: number } | null {
  const p = prompt.toLowerCase();

  const dims = p.match(/(\d{2,4})\s*[x×]\s*(\d{2,4})/i);
  if (dims) {
    const w = clamp(Number(dims[1]));
    const h = clamp(Number(dims[2]));
    return { w, h };
  }

  const single = p.match(/(\d{2,4})\s*(px|píxeles|pixeles)?/i);
  if (single) {
    const size = clamp(Number(single[1]));
    return { size };
  }

  if (/\b(pequeñ[oa]|small)\b/.test(p)) return { size: SIZE_SMALL };
  if (/\b(median[oa]|medium|normal)\b/.test(p)) return { size: SIZE_MEDIUM };
  if (/\b(grande|big|large|enorme|huge)\b/.test(p)) return { size: SIZE_LARGE };

  return null;
}

function enforceSquareIfNeeded(shape: Shape, prompt: string): Shape {
  const p = prompt.toLowerCase();
  if (/\b(círculo|circulo|circle)\b/.test(p)) {
    const size = Math.max(shape.w, shape.h);
    return { ...shape, geo: "ellipse", w: size, h: size };
  }
  if (/\b(cuadrado|square)\b/.test(p)) {
    const size = Math.max(shape.w, shape.h);
    return { ...shape, geo: "rectangle", w: size, h: size };
  }
  return shape;
}

function applySize(base: Shape, prompt: string): Shape {
  const found = detectSizeFromPrompt(prompt);
  if (!found) return base;

  if (found.w && found.h) {
    return { ...base, w: clamp(found.w), h: clamp(found.h) };
  }

  if (found.size) {
    const s = clamp(found.size);

    if (
      /\b(círculo|circulo|circle|cuadrado|square)\b/.test(prompt.toLowerCase())
    ) {
      return { ...base, w: s, h: s };
    }

    const w = s;
    const h = Math.round(s * (DEFAULT_RECT_H / DEFAULT_RECT_W));
    return { ...base, w, h };
  }

  return base;
}

export const aiRouter = router({
  generateShape: publicProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(async ({ input }: { input: { prompt: string } }) => {
      const geo = detectGeoFromPrompt(input.prompt);
      const color = detectColorFromPrompt(input.prompt);

      if (!geo && !color) {
        return {
          ok: false as const,
          error:
            "No pude entender la forma ni el color. Ejemplos: 'círculo rojo', 'estrella violeta', 'rectángulo verde'.",
        };
      }
      if (!geo) {
        return {
          ok: false as const,
          error:
            "No pude entender la forma. Usa: rectángulo, círculo, cuadrado, triángulo, diamante, estrella, corazón.",
        };
      }
      if (!color) {
        return {
          ok: false as const,
          error:
            "No pude entender el color. Usa: rojo, azul, verde, amarillo, naranja, violeta, gris, negro.",
        };
      }
      let base: Shape = {
        geo,
        w: DEFAULT_RECT_W,
        h: DEFAULT_RECT_H,
        color,
        label: "",
      };

      base = applySize(base, input.prompt);

      base = enforceSquareIfNeeded(base, input.prompt);

      base = { ...base, w: clamp(base.w), h: clamp(base.h) };

      return { ok: true as const, shape: base };
    }),
});
