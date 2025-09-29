"use client";

import { useState } from "react";
import type { Editor, TLDefaultColorStyle } from "tldraw";
import { createShapeId } from "tldraw";
import { trpc } from "@/app/providers";
import { useToast } from "@/components/ui/toast";
import { aiPanel, aiInput, aiButton } from "./aiShapeModal.variants";

type Props = { editor: Editor | null };

export function AiShapeModal({ editor }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!editor || !prompt.trim()) return;
    setLoading(true);
    try {
      const res = await trpc.ai.generateShape.mutate({ prompt });

      if (!res.ok) {
        toast({ variant: "destructive", title: "IA", description: res.error });
        return;
      }

      const { geo, w, h, color, label } = res.shape;

      editor.createShapes([
        {
          id: createShapeId(`ai-${Date.now()}`),
          type: "geo",
          x: 240,
          y: 200,
          props: {
            geo,
            w,
            h,
            color: (color ?? "blue") as TLDefaultColorStyle,
            dash: "draw",
            fill: "solid",
            size: "m",
          },
        },
      ]);

      toast({ title: "IA", description: `Generé: ${label || geo} (${color})` });
      setPrompt("");
    } catch {
      toast({
        variant: "destructive",
        title: "IA",
        description: "No se pudo generar la figura. Intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={aiPanel()}>
      <input
        className={aiInput()}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Describe una figura… ej: "círculo rojo grande"'
        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
      />
      <button
        className={aiButton()}
        onClick={handleGenerate}
        disabled={loading || !editor}
      >
        {loading ? "Generando…" : "✨ IA"}
      </button>
    </div>
  );
}
