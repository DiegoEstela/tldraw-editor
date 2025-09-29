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
import { useToast } from "@/components/ui/toast";

export function useTldrawAutosave() {
  const editorRef = useRef<Editor | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const persistSnapshot = useCallback(async () => {
    const editor = editorRef.current;
    if (!editor) return;
    try {
      setIsSaving(true);
      const snapshot = getSnapshot(editor.store);
      await trpc.document.save.mutate(snapshot);
    } catch {
      toast({
        variant: "destructive",
        title: "No se pudo guardar",
        description: "Revisa tu conexión e inténtalo nuevamente.",
      });
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const scheduleSave = useCallback(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      void persistSnapshot();
    }, SAVE_DEBOUNCE_MS);
  }, [persistSnapshot]);

  const loadInitialSnapshot = useCallback(
    async (editor: Editor) => {
      try {
        const data: TLEditorSnapshot | null = await trpc.document.get.query();
        if (data) loadSnapshot(editor.store, data);
      } catch {
        toast({
          variant: "destructive",
          title: "No se pudo cargar el documento",
          description: "Podés editar igual; intentaremos guardar tus cambios.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  function mount(editor: Editor, onDocChange?: () => void) {
    editorRef.current = editor;

    loadInitialSnapshot(editor)
      .catch(() => {})
      .finally(() => {
        if (unsubscribeRef.current) unsubscribeRef.current();

        unsubscribeRef.current = editor.store.listen(
          () => {
            scheduleSave();
            onDocChange?.();
          },
          { scope: "document" }
        );
      });
  }

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  return {
    isLoading,
    isSaving,
    mount,
    scheduleSave,
    get editor() {
      return editorRef.current;
    },
  };
}
