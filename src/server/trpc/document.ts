/**
 * - `get` → devuelve el snapshot actual de Tldraw desde memoria (`TLEditorSnapshot | null`).
 * - `save(input)` → persiste un `TLEditorSnapshot` completo en memoria y retorna `{ ok: true, updatedAt }`.
 * Transporte: usa superjson para serializar estructuras complejas.
 * Alcance: persistencia mock en memoria (válida para la prueba técnica).
 */
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";
import type { TLEditorSnapshot } from "tldraw";
import { Context } from "./context";

const trpc = initTRPC.context<Context>().create({ transformer: superjson });

let memoryDocument: TLEditorSnapshot | null = null;

export const documentRouter = trpc.router({
  get: trpc.procedure.query(() => memoryDocument),
  save: trpc.procedure.input(z.any()).mutation(({ input }) => {
    memoryDocument = input as TLEditorSnapshot;
    return { ok: true, updatedAt: Date.now() };
  }),
});
