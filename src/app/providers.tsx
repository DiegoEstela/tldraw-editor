"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpLink, createTRPCProxyClient } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "@/server/trpc/routers/_app";
import React from "react";

const queryClient = new QueryClient();

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: "/api/trpc",
      transformer: superjson,
      headers() {
        return { "content-type": "application/json" };
      },
    }),
  ],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
