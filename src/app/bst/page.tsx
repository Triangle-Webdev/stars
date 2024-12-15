"use client";
import { Canvas, Drawable } from "./canvas";
import { BSTNode, calculateNodePositions, createNode, Vertice } from "./node";

const DEFAULT_CONFIG = {
  radius: 20,
  nodeWidthSpacing: 25,
  nodeHeightSpacing: 100,
  fontSize: 10,
};

const drawAction: Drawable = (ctx: CanvasRenderingContext2D) => {
  _drawNodeWithCoords(ctx, createNode(1));
};

const _drawNodeWithCoords = (ctx: CanvasRenderingContext2D, node?: BSTNode) => {
  if (!node) return;
  const adjList = calculateNodePositions(node);

  adjList
    .entries()
    .map(([k, { value, xOffset, yOffset, edges }]) => ({
      value: value,
      x: xOffset * ctx.canvas.width,
      y: yOffset * ctx.canvas.height + DEFAULT_CONFIG.nodeHeightSpacing,
      edges,
    }))
    .forEach(({ value, x, y, edges }) => {
      drawNode(ctx, x, y, value);
      edges
        .map((n) => adjList.get(n) as Vertice)
        .map((neighbor) => ({
          x: neighbor.xOffset * ctx.canvas.width,
          y:
            neighbor.yOffset * ctx.canvas.height +
            DEFAULT_CONFIG.nodeHeightSpacing,
        }))
        .forEach((neighborCoords) => {
          connectEdge(
            ctx,
            x,
            neighborCoords.x,
            y + DEFAULT_CONFIG.radius,
            neighborCoords.y - DEFAULT_CONFIG.radius,
          );
        });
    });
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
