"use client";
import { Canvas, Drawable } from "./canvas";
import { BSTNode, calculateNodePositions, createNode, findDepth } from "./node";

const DEFAULT_CONFIG = {
  radius: 20,
  nodeWidthSpacing: 25,
  nodeHeightSpacing: 100,
  fontSize: 10,
};

const drawAction: Drawable = (ctx: CanvasRenderingContext2D) => {
  _drawNodeWithCoords(ctx, createNode(1, null, null));

  // _drawNode(
  //   ctx,
  //   createNode(2, createNode(1, null, null), createNode(3, null, null)),
  // );

  // const { x1, y1 } = { x1: 100, y1: 100 };
  // const { x2, y2 } = { x2: centerWidth, y2: centerHeight };
  // const { radius } = DEFAULT_CONFIG;
  // connectEdge(ctx, x1, x2, y1 + radius, y2 - radius);
};

const _drawNodeWithCoords = (
  ctx: CanvasRenderingContext2D,
  node: BSTNode<number | string> | null,
) => {
  if (!node) return;
  // move this to a function that returns the real x and y coords
  calculateNodePositions(node).forEach(({ value, xOffset, yOffset }) =>
    drawNode(
      ctx,
      xOffset * ctx.canvas.width,
      yOffset * ctx.canvas.height + DEFAULT_CONFIG.nodeHeightSpacing,
      value as any,
    ),
  );
};

const drawNode = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  value: number | string,
) => {
  ctx.beginPath();
  ctx.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "lightblue";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = "purple";
  ctx.stroke();

  ctx.font = `${DEFAULT_CONFIG.fontSize}pt serif`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(`${value}`, x, y + DEFAULT_CONFIG.fontSize / 2);
};

const connectEdge = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  x2: number,
  y1: number,
  y2: number,
) => {
  const xHalf = (x1 + x2) / 2;
  const yHalf = (y1 + y2) / 2;

  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo(xHalf, yHalf, x2, yHalf, x2, y2);
  ctx.stroke();
};

export default function BSTPage() {
  return <Canvas drawAction={drawAction} />;
}
