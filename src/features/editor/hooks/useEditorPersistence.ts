"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  type Editor,
  type TLEditorSnapshot,
  getSnapshot,
  loadSnapshot,
} from "tldraw";
import { trpc } from "@/app/providers";
import { SAVE_DEBOUNCE_MS } from "@/lib/constants";

/**
 * Hook que encapsula la persistencia del editor Tldraw:
 * - Carga el snapshot inicial desde el backend (tRPC).
 * - Escucha cambios en el store y guarda con debounce.
 * - Expone handlers para montar el editor y ejecutar acciones de UI.
 */
export function useEditorPersistence() {
  const editorRef = useRef<Editor | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const persistSnapshot = useCallback(async () => {
    const editor = editorRef.current;
    if (!editor) return;

    try {
      setIsSaving(true);
      const snapshot = getSnapshot(editor.store);
      await trpc.document.save.mutate(snapshot);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const scheduleSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      void persistSnapshot();
    }, SAVE_DEBOUNCE_MS);
  }, [persistSnapshot]);

  const loadInitialSnapshot = useCallback(async (editor: Editor) => {
    try {
      const data = await trpc.document.get.query();
      if (data) {
        loadSnapshot(editor.store, data as unknown as TLEditorSnapshot);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEditorMount = useCallback(
    (editor: Editor) => {
      editorRef.current = editor;
      void loadInitialSnapshot(editor);
      unsubscribeRef.current = editor.store.listen(() => {
        scheduleSave();
      });
    },
    [loadInitialSnapshot, scheduleSave]
  );

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const handleModifyShape = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    alert("Modificar shape: pendiente de implementar.");
  }, []);

  return {
    isLoading,
    isSaving,
    handleEditorMount,
    handleModifyShape,
  };
}
