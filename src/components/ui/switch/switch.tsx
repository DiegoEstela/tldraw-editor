"use client";
/**
 * Switch
 * Conmutador accesible para toggles binarios. Controlado o no-controlado vía `checked`/`onCheckedChange`.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (next: boolean) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
  ...rest
}: Props) {
  const [internal, setInternal] = React.useState<boolean>(
    defaultChecked ?? false
  );
  const isControlled = typeof checked === "boolean";
  const value = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        value ? "bg-primary" : "bg-muted",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...rest}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 translate-x-0.5 transform rounded-full bg-background shadow transition-transform",
          value && "translate-x-[22px]"
        )}
      />
    </button>
  );
}
