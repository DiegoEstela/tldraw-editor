"use client";
import { useCallback, useState } from "react";
import { type Editor, type TLGeoShape, createShapeId } from "tldraw";
import { SHAPE_CONFIGS } from "@/lib/constants";
import { useToast } from "@/components/ui/toast";
import { isGeoShape, indexByGeo, randomDifferentIndex } from "@/lib/utils";

const DEMO_SHAPE_ID = createShapeId("demo-shape");

export function useDemoShape(
  getEditor: () => Editor | null,
  scheduleSave: () => void
) {
  const [hasShape, setHasShape] = useState(false);
  const [shapeIndex, setShapeIndex] = useState(0);
  const { toast } = useToast();

  const syncFromStore = useCallback(() => {
    const editor = getEditor();
    if (!editor) return;
    const existing = editor.getShape(DEMO_SHAPE_ID);
    if (isGeoShape(existing as TLGeoShape)) {
      setHasShape(true);
      setShapeIndex(indexByGeo((existing!.props as { geo: string }).geo));
    } else {
      setHasShape(false);
      setShapeIndex(0);
    }
  }, [getEditor]);

  const handleModifyShape = useCallback(() => {
    const editor = getEditor();
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
      scheduleSave();
      return;
    }

    const nextIndex = randomDifferentIndex(SHAPE_CONFIGS.length, shapeIndex);
    const { geo, w, h, label } = SHAPE_CONFIGS[nextIndex];

    editor.updateShapes([
      { id: DEMO_SHAPE_ID, type: "geo", props: { geo, w, h } },
    ]);
    editor.select(DEMO_SHAPE_ID);
    setShapeIndex(nextIndex);
    toast({
      title: "Forma modificada",
      description: `La forma cambió a ${label}.`,
    });
    scheduleSave();
  }, [getEditor, shapeIndex, toast, scheduleSave]);

  return { hasShape, shapeIndex, handleModifyShape, syncFromStore };
}
