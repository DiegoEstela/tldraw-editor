"use client";
/**
 * useEditorPersistence
 *
 * - Carga snapshot inicial (tRPC).
 * - Autosave con debounce sólo ante cambios de documento (sin guardar por mover el mouse).
 * - Crea una forma si no existe; si existe, cambia a otra distinta (no repite).
 * - Usa shapeIndex como fuente de verdad para el botón.
 */

"use client";
import { useDemoShape } from "@/app/editor/hooks/useDemoShape";
import { useTldrawAutosave } from "@/app/editor/hooks/useTldrawAutosave";
import { type Editor } from "tldraw";

export function useEditorPersistence() {
  const { isLoading, isSaving, mount, scheduleSave, editor } =
    useTldrawAutosave();
  const { hasShape, shapeIndex, handleModifyShape, syncFromStore } =
    useDemoShape(() => editor, scheduleSave);

  function handleEditorMount(e: Editor) {
    mount(e, () => syncFromStore());
  }

  return {
    isLoading,
    isSaving,
    hasShape,
    shapeIndex,
    handleModifyShape,
    handleEditorMount,
  };
}
