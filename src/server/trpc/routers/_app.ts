import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "../context";
import { documentRouter } from "../document";

const t = initTRPC.context<Context>().create({ transformer: superjson });

export const appRouter = t.router({
  document: documentRouter,
});

export type AppRouter = typeof appRouter;
