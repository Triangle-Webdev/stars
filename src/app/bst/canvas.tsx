"use client";

import React from "react";
import { useCanvas } from "./useCanvas";

export type Drawable = (ctx: CanvasRenderingContext2D) => void;
export interface CanvasProps {
  drawAction: Drawable;
}

export const Canvas = ({ drawAction }: CanvasProps) => {
  const ref = useCanvas(drawAction);
  return <canvas ref={ref}></canvas>;
};
