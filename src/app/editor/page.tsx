"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { useEditorPersistence } from "@/features/editor/hooks/useEditorPersistence";
import { Button } from "@/components/ui/button";

/**
 * EditorPage renderiza el canvas de Tldraw y delega toda la lógica
 * de carga y persistencia al hook `useEditorPersistence`. Muestra
 * estados de carga/guardado y un botón de acción básico.
 */
export default function EditorPage() {
  const { isLoading, isSaving, handleEditorMount, handleModifyShape } =
    useEditorPersistence();

  return (
    <main className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Editor</h1>
        <Button onClick={handleModifyShape} disabled={isSaving || isLoading}>
          {isSaving ? "Guardando..." : "Modificar shape"}
        </Button>
      </header>

      <section className="h-[70vh] rounded-xl border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            Cargando documento...
          </div>
        ) : (
          <Tldraw onMount={handleEditorMount} />
        )}
      </section>
    </main>
  );
}
