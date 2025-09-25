import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "tldraw-editor",
  description: "Editor simple con Next.js, tRPC y tldraw",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
