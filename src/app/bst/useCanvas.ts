"use client";

import { useEffect, useRef } from "react";
import { Drawable } from "./canvas";

export const useCanvas = (drawAction: Drawable) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const maxHeight = window.innerHeight;
    const maxWidth = window.innerWidth;
    const canvas = ref.current as HTMLCanvasElement;
    canvas.height = maxHeight - 100;
    canvas.width = maxWidth - 100;
    const context = canvas?.getContext("2d") as CanvasRenderingContext2D;
    drawAction(context);
  }, [drawAction]);

  return ref;
};
