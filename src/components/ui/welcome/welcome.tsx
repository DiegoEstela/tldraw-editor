"use client";

import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  wrapperVariants,
  containerVariants,
  headerVariants,
  titleVariants,
  subtitleVariants,
  kbdVariants,
  chipsVariants,
  chipItemVariants,
  actionsVariants,
  footerVariants,
  footerInnerVariants,
  themeToggleWrapperVariants,
  themeToggleLabelVariants,
  type WelcomeVariantProps,
  ctaButtonVariants,
} from "./welcome.variants";
import { useCallback, useEffect, useState } from "react";

type Props = {
  appName: string;
  author: string;
  subtitle?: string;
} & Partial<WelcomeVariantProps>;

export default function Welcome({
  appName,
  author,
  subtitle = "Dibuja, edita y continúa donde lo dejaste",
  glow = "on",
  align = "center",
  size = "md",
  tone = "brand",
  bg = "halo",
}: Props) {
  const [isDark, setIsDark] = useState(false);

  const applyTheme = useCallback((next: boolean) => {
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      const next = stored === "dark";
      document.documentElement.classList.toggle("dark", next);
      setIsDark(next);
      return;
    }
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);
  }, []);

  return (
    <main className={cn(wrapperVariants({ glow, bg }))}>
      <div className={themeToggleWrapperVariants()}>
        <span className={themeToggleLabelVariants()}>
          {isDark ? "Dark" : "Light"}
        </span>
        <Switch
          aria-label="Alternar tema"
          checked={isDark}
          onCheckedChange={applyTheme}
        />
      </div>

      <section className={containerVariants({ align, size })}>
        <header className={headerVariants()}>
          <p className={kbdVariants({ tone })}>
            Technical Test — tldraw + Next.js
          </p>
          <h1 className={titleVariants({ size })}>Drawing Editor</h1>
          <p className={subtitleVariants()}>{subtitle}</p>
        </header>

        <ul className={chipsVariants({ align })}>
          {[
            "Next.js",
            "TypeScript",
            "tldraw",
            "tRPC",
            "TailwindCSS",
            "shadcn/ui",
          ].map((tag) => (
            <li key={tag} className={chipItemVariants()}>
              {tag}
            </li>
          ))}
        </ul>

        <div className={actionsVariants({ align })}>
          <Link
            href="/editor"
            aria-label="Abrir el editor y comenzar el challenge"
            className={ctaButtonVariants()}
          >
            Comenzar el challenge
          </Link>
        </div>
      </section>

      <footer className={footerVariants()}>
        <div className={footerInnerVariants()}>
          <span>{appName}</span>
          <span>Creado por {author} · 2025</span>
        </div>
      </footer>
    </main>
  );
}
