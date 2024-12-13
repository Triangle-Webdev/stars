"use client";

import { useEffect, useRef } from "react";
import { Drawable } from "./canvas";

export const useCanvas = (drawAction: Drawable) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const maxHeight = window.innerHeight;
    const maxWidth = window.innerWidth;
    const canvas = ref.current as HTMLCanvasElement;
    canvas.height = maxHeight;
    canvas.width = maxWidth;
    const context = canvas?.getContext("2d") as CanvasRenderingContext2D;
    let frameCount = 0;
    let animationFrameId: number;
    const render = () => {
      frameCount++;
      drawAction(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [drawAction]);

  return ref;
};
