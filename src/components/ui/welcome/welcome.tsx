"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  wrapperVariants,
  containerVariants,
  titleVariants,
  kbdVariants,
  chipsVariants,
  actionsVariants,
  footerVariants,
  type WelcomeVariantProps,
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
  subtitle = "",
  glow = "on",
  align = "center",
  size = "md",
  tone = "default",
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
      <div className="absolute right-4 top-4 z-50 flex items-center gap-2">
        <span className="hidden select-none text-xs text-muted-foreground sm:block">
          {isDark ? "Dark" : "Light"}
        </span>
        <Switch
          aria-label="Alternar tema"
          checked={isDark}
          onCheckedChange={applyTheme}
        />
      </div>

      <section className={cn("flex-1", containerVariants({ align, size }))}>
        <header className="space-y-4">
          <p className={cn(kbdVariants({ tone }))}>
            Technical Test — tldraw + Next.js
          </p>
          <h1 className={cn(titleVariants({ size }))}>Drawing Editor</h1>
          <p className="mx-auto max-w-prose text-base text-muted-foreground">
            {subtitle}
          </p>
        </header>

        <ul className={cn(chipsVariants({ align }))}>
          {[
            "Next.js",
            "TypeScript",
            "tldraw",
            "tRPC",
            "TailwindCSS",
            "shadcn/ui",
          ].map((tag) => (
            <li key={tag} className="rounded-full border px-3 py-1">
              {tag}
            </li>
          ))}
        </ul>

        <div className={cn(actionsVariants({ align }))}>
          <Button asChild>
            <Link href="/editor">Ir al editor →</Link>
          </Button>
        </div>
      </section>

      <footer className={cn(footerVariants())}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 text-xs text-muted-foreground">
          <span>{appName}</span>
          <span>Creado por {author} · 2025</span>
        </div>
      </footer>
    </main>
  );
}
