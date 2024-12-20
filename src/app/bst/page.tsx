"use client";
import { Canvas, Drawable } from "./canvas";
import {
  bezierCurve,
  drawCircle,
  fillCircle,
  Point,
  writeText,
} from "./drawUtils";
import { range } from "./fpUtils";
import {
  adjacencyList,
  BSTNode,
  node,
  rowGenerator,
  treeToMatrix,
} from "./node";

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

const DrawUtils = {
  scale: (size: number) => (coefs: number[]) => coefs.map((x) => x * size),
};

type StupdBSTType = { coords: Point; value: number; children: number[] };

const drawBST = (
  width: number,
  height: number,
  root?: BSTNode,
): Array<StupdBSTType> => {
  const gen = rowGenerator();
  const tree = treeToMatrix(root);
  const scaleX = DrawUtils.scale(width);
  const adjList = adjacencyList(root);

  return tree
    .map((row, rowIndex) => {
      const nextRow = gen.next().value as number[];
      const coords = scaleX(nextRow).map((x) => ({
        x,
        y: (rowIndex + 1) * 0.2 * height,
      }));

      const mappedInner = range(0, coords.length)
        .map((_, elementIndex) => {
          return {
            coords: coords[elementIndex],
            value: row[elementIndex],
            children:
              adjList.get(row[elementIndex])?.children || ([] as number[]),
          } as StupdBSTType;
        })
        .filter((e) => e.value !== null);
      return mappedInner;
    })
    .flat();
};

// adjList.map(...): DrawAction[];
const drawAction: Drawable = (ctx: CanvasRenderingContext2D) => {
  const data = drawBST(ctx.canvas.width, ctx.canvas.height, root);
  const mappedData = new Map(data.map((e) => [e.value, e]));
  const drawCurve = bezierCurve("green")(ctx);

  const mapped = data.map((e) => {
    return {
      ...e,
      children: e.children
        .map((child) => mappedData.get(child)?.coords)
        .filter((e) => !!e),
    };
  });

  mapped.forEach((e) => {
    drawNode(ctx, e.coords.x, e.coords.y, e.value);
    e.children.forEach((childCoords) => {
      drawCurve({
        from: { x: e.coords.x, y: e.coords.y + 40 },
        to: { x: childCoords.x, y: childCoords.y - 40 },
      });
    });
  });
};

export default function BSTPage() {
  return <Canvas drawAction={drawAction} />;
}
