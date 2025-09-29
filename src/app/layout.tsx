import "./globals.css";
import Providers from "./providers";
import { ToastProvider, Toaster } from "@/components/ui/toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Drawing Editor - Diego Estela",
    template: "%s · Drawing Editor",
  },
  description: "Editor built with Next.js + tldraw + tRPC.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ToastProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
