import "./globals.css";
import Providers from "./providers";
import { ToastProvider, Toaster } from "@/components/ui/toast";

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
