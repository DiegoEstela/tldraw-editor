/**
 * Núcleo de tRPC para el servidor.
 * - Expone `trpcServer`: única instancia de initTRPC con contexto y superjson.
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context";

export const trpcServer = initTRPC.context<Context>().create({
  transformer: superjson,
});
