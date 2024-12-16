"use client";
import { Canvas, Drawable } from "./canvas";
import {
  drawBezierCurve,
  drawCircle,
  fillCircle,
  writeText,
} from "./drawUtils";
import { BSTNode, nodePositions, node, Vertice } from "./node";

const DEFAULT_CONFIG = {
  radius: 40,
  nodeWidthSpacing: 25,
  nodeHeightSpacing: 100,
  fontSize: 20,
};

const drawAction: Drawable = (ctx: CanvasRenderingContext2D) => {
  _drawNodes(ctx, node(1));
};

const root = node(
  1,
  node(2, node(4, node(8), node(10)), node(5, undefined, node(9))),
  node(3, node(6), node(7)),
);

const _drawNodes = (ctx: CanvasRenderingContext2D, node?: BSTNode) => {
  if (!node) return;

  const adjList = nodePositions(root);
  const { height, width } = ctx.canvas;
  const { radius, nodeHeightSpacing, fontSize } = DEFAULT_CONFIG;

  adjList
    .entries()
    .map(([k, { value, xOffset, yOffset, edges }]) => ({
      value: value,
      x: xOffset * width,
      y: yOffset * height + nodeHeightSpacing,
      edges,
    }))
    .forEach(({ value, x, y, edges }) => {
      fillCircle({ ctx, x, y, radius });
      drawCircle({ ctx, x, y, radius });
      writeText({ ctx, x, y, fontSize, value });
      edges
        .map((n) => adjList.get(n) as Vertice)
        .forEach(({ xOffset, yOffset }) => {
          drawBezierCurve({
            ctx,
            start: { x, y: y + radius },
            end: {
              x: xOffset * width,
              y: yOffset * height + nodeHeightSpacing - radius,
            },
          });
        });
    });
};

export default function BSTPage() {
  return <Canvas drawAction={drawAction} />;
}
