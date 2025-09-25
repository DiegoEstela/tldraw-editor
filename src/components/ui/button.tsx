"use client";
/**
 * Functionalidad: botón accesible y consistente que aplica variantes/tamaños
 * (shadcn + cva). Puede renderizar como <button> o delegar estilos a un hijo
 * mediante `asChild` (Radix Slot), manteniendo semántica y estilos unificados.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariantProps } from "./button.variants";

type ButtonProps = React.ComponentProps<"button"> &
  ButtonVariantProps & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
