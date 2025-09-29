/**
 * documentRouter
 *
 * Funcionalidad:
 * - `get` → devuelve el snapshot actual de Tldraw desde memoria (`TLEditorSnapshot | null`).
 * - `save(input)` → persiste un `TLEditorSnapshot` completo en memoria y retorna `{ ok: true, updatedAt }`.
 *
 * Notas:
 * - Persistencia mock en memoria (válida para la prueba técnica).
 * - La entrada se tipa como `unknown` (evitando `any`) y se castea a `TLEditorSnapshot` al guardar.
 */
import { z } from "zod";
import type { TLEditorSnapshot } from "tldraw";
import { trpcServer } from "./core";

let memoryDocument: TLEditorSnapshot | null = null;

export const documentRouter = trpcServer.router({
  get: trpcServer.procedure.query(() => memoryDocument),

  save: trpcServer.procedure.input(z.unknown()).mutation(({ input }) => {
    memoryDocument = input as TLEditorSnapshot;
    return { ok: true, updatedAt: Date.now() };
  }),
});
