"use client";
import { Canvas, Drawable } from "./canvas";
import { drawCircle, fillCircle, writeText } from "./drawUtils";
import { node, rowGenerator, treeToMatrix } from "./node";

const root = node(
  1,
  node(2, node(4, node(8), node(10)), node(5, undefined, node(9))),
  node(3, node(6), node(7)),
);

const drawNode = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  value: number,
) => {
  drawCircle({ ctx, point: { x, y }, radius: 40 });
  fillCircle({ ctx, point: { x, y }, radius: 40 });
  writeText({
    ctx,
    point: { x, y },
    fontSize: 20,
    value,
  });
};

const drawAction: Drawable = (ctx: CanvasRenderingContext2D) => {
  const gen = rowGenerator();
  const tree = treeToMatrix(root);

  tree.map((row, rowIndex) => {
    const nextRow = gen.next().value as number[];
    return row
      .map((e, elementIndex) => ({
        x: nextRow[elementIndex] * ctx.canvas.width,
        y: (rowIndex + 1) * 0.2 * ctx.canvas.height,
        value: e,
      }))
      .filter((e) => !!e.value)
      .forEach((e) => drawNode(ctx, e.x, e.y, e.value));
  });
};

export default function BSTPage() {
  return <Canvas drawAction={drawAction} />;
}
