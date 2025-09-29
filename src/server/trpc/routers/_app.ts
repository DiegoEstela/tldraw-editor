import { trpcServer } from "../core";
import { documentRouter } from "../document";
import { aiRouter } from "./ai";

export const appRouter = trpcServer.router({
  document: documentRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
