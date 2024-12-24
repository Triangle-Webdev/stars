"use client";
import { Canvas, Drawable } from "./canvas";
import { drawCircle, fillCircle, writeText } from "./drawUtils";
import { BSTNode, node, height, zipTree } from "./node";

const root = node(
  1,
  node(2, node(4, node(8), node(10)), node(5, undefined, node(9))),
  node(3, node(6), node(7)),
);

const drawNode =
  (x: number, y: number, value: number): Drawable =>
  (ctx) => {
    drawCircle({ ctx, point: { x, y }, radius: 40 });
    fillCircle({ ctx, point: { x, y }, radius: 40 });
    writeText({
      ctx,
      point: { x, y },
      fontSize: 20,
      value,
    });
  };

/**
 * What if I had a map like <nodeValue, <point, children[]>
 */

function drawBST(width: number, height: number, root?: BSTNode): Drawable[] {
  return zipTree({ height, width, root })
    .filter((e) => !!e.value)
    .map((e) => drawNode(e.x, e.y, e.value));
}

const drawAction: Drawable = (ctx: CanvasRenderingContext2D) => {
  drawBST(ctx.canvas.width, ctx.canvas.height, root).forEach((e) => e(ctx));
};

export default function BSTPage() {
  return <Canvas drawAction={drawAction} />;
}
