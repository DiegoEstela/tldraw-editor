"use client";
/**
 * EditorPage
 * Renderiza el canvas de Tldraw y delega carga/persistencia al hook `useEditorPersistence`.
 * Incluye botón para crear/modificar una figura y badge de estado de guardado.
 */
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { useEditorPersistence } from "@/features/editor/hooks/useEditorPersistence";
import {
  editorWrapper,
  canvasLayer,
  loadingOverlay,
  loadingBox,
  actionFloater,
  statusPill,
  floaterButton,
} from "./page.variants";

export default function EditorPage() {
  const {
    isLoading,
    isSaving,
    handleEditorMount,
    handleModifyShape,
    hasShape,
  } = useEditorPersistence();

  return (
    <main className={editorWrapper()}>
      <div className={canvasLayer()}>
        <Tldraw onMount={handleEditorMount} />
      </div>

      {isLoading && (
        <div className={loadingOverlay()}>
          <div className={loadingBox()}>Cargando documento…</div>
        </div>
      )}

      <div className={actionFloater()}>
        <button
          onClick={handleModifyShape}
          className={floaterButton()}
          disabled={isSaving || isLoading}
        >
          {hasShape ? "Modificar forma" : "Crear forma"}
        </button>

        <div className={statusPill({ state: isSaving ? "saving" : "saved" })}>
          {isSaving ? "Guardando…" : "Cambios guardados"}
        </div>
      </div>
    </main>
  );
}
