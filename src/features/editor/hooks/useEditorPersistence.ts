"use client";
/**
 * useEditorPersistence
 * Carga el snapshot inicial (tRPC), escucha cambios del store y hace autosave con debounce.
 * Maneja creación/modificación de una forma geo (rectángulo, círculo, etc.) de manera tipada.
 */
import { useRef, useState, useEffect, useCallback } from "react";
import {
  type Editor,
  type TLEditorSnapshot,
  type TLGeoShape,
  getSnapshot,
  loadSnapshot,
} from "tldraw";
import { trpc } from "@/app/providers";
import {
  DEMO_SHAPE_ID,
  SAVE_DEBOUNCE_MS,
  SHAPE_CONFIGS,
} from "@/lib/constants";
import { useToast } from "@/components/ui/toast";

function isGeoShape(shape: unknown): shape is TLGeoShape {
  return (
    typeof shape === "object" &&
    shape !== null &&
    (shape as TLGeoShape).type === "geo"
  );
}

export function useEditorPersistence() {
  const editorRef = useRef<Editor | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [shapeIndex, setShapeIndex] = useState(0);
  const [hasShape, setHasShape] = useState(false);

  const { toast } = useToast();

  const persistSnapshot = useCallback(async (): Promise<void> => {
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

  const scheduleSave = useCallback((): void => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      void persistSnapshot();
    }, SAVE_DEBOUNCE_MS);
  }, [persistSnapshot]);

  const updateShapeState = useCallback((editor: Editor): void => {
    const existing = editor.getShape(DEMO_SHAPE_ID);
    if (isGeoShape(existing)) {
      setHasShape(true);

      const foundIndex = SHAPE_CONFIGS.findIndex(
        (cfg) => cfg.geo === existing.props.geo
      );
      if (foundIndex >= 0) setShapeIndex(foundIndex);
    } else {
      setHasShape(false);
      setShapeIndex(0);
    }
  }, []);

  const loadInitialSnapshot = useCallback(
    async (editor: Editor): Promise<void> => {
      try {
        const data: TLEditorSnapshot | null = await trpc.document.get.query();
        if (data) {
          loadSnapshot(editor.store, data);
          updateShapeState(editor);
        }
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
    [toast, updateShapeState]
  );

  const handleEditorMount = useCallback(
    (editor: Editor): void => {
      editorRef.current = editor;
      void loadInitialSnapshot(editor);

      unsubscribeRef.current = editor.store.listen(() => {
        scheduleSave();
        updateShapeState(editor);
      });
    },
    [loadInitialSnapshot, scheduleSave, updateShapeState]
  );

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const handleModifyShape = useCallback((): void => {
    const editor = editorRef.current;
    if (!editor) return;

    const existing = editor.getShape(DEMO_SHAPE_ID);

    if (!isGeoShape(existing)) {
      const { geo, w, h, label } = SHAPE_CONFIGS[0];
      editor.createShapes([
        {
          id: DEMO_SHAPE_ID,
          type: "geo",
          x: 120,
          y: 120,
          props: {
            geo,
            w,
            h,
            dash: "draw",
            color: "blue",
            fill: "solid",
            size: "m",
          },
        },
      ]);
      editor.select(DEMO_SHAPE_ID);
      setHasShape(true);
      setShapeIndex(0);

      toast({
        title: "Forma creada",
        description: `Se agregó un ${label} al canvas.`,
      });
      return;
    }
    const nextIndex = (shapeIndex + 1) % SHAPE_CONFIGS.length;
    const { geo, w, h, label } = SHAPE_CONFIGS[nextIndex];

    editor.updateShapes([
      {
        id: DEMO_SHAPE_ID,
        type: "geo",
        props: { geo, w, h },
      },
    ]);
    editor.select(DEMO_SHAPE_ID);
    setShapeIndex(nextIndex);

    toast({
      title: "Forma modificada",
      description: `La forma cambió a ${label}.`,
    });
  }, [shapeIndex, toast]);

  return {
    isLoading,
    isSaving,
    handleEditorMount,
    handleModifyShape,
    hasShape,
  };
}
