"use client";
import { Canvas, Drawable } from "./canvas";
import {
  bezierCurve,
  drawCircle,
  fillCircle,
  Point,
  straight,
  writeText,
} from "./drawUtils";
import { BSTNode, node, zipTree, DrawableNode } from "./node";

const root = node(
  1,
  node(2, node(4, node(8), node(10)), node(5, undefined, node(9))),
  node(3, node(6), node(7)),
);

const drawBezier = bezierCurve("green");
const drawStraightLine = straight("green");

function nodeToDrawable(
  value: number,
  map: Map<number, DrawableNode>,
): Drawable {
  const drawableNode = map.get(value) as DrawableNode;
  const from = { x: drawableNode.point.x, y: drawableNode.point.y + 40 };

  return (ctx) => {
    fillCircle({ ctx, point: drawableNode.point, radius: 40 });
    drawCircle({ ctx, point: drawableNode.point, radius: 40 });
    writeText({
      ctx,
      point: drawableNode.point,
      fontSize: 20,
      value: drawableNode.value,
    });

    drawableNode.children
      .map((child) => map.get(child)!.point as Point)
      .map((childPoint) => ({
        from,
        to: { x: childPoint.x, y: childPoint.y },
      }))
      .forEach((curve) => drawStraightLine(ctx)(curve));
  };
}

function treeToDrawableMap(
  width: number,
  height: number,
  root?: BSTNode,
): Map<number, DrawableNode> {
  const zipped: DrawableNode[] = zipTree({
    height,
    width,
    root,
  }).filter((e) => !!e.value);

  return new Map(zipped.map((e) => [e.value, e]));
}

const drawAction: Drawable = (ctx: CanvasRenderingContext2D) => {
  const map = treeToDrawableMap(ctx.canvas.width, ctx.canvas.height, root);
  map
    .keys()
    .map((k) => nodeToDrawable(k, map))
    .forEach((e) => e(ctx));
};

export default function BSTPage() {
  return <Canvas drawAction={drawAction} />;
}
