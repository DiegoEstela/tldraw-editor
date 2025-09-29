import { trpcServer } from "../core";
import { documentRouter } from "../document";

export const appRouter = trpcServer.router({
  document: documentRouter,
});

export type AppRouter = typeof appRouter;
