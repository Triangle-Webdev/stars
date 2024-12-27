import { map } from "ramda";
import { Drawable } from "./canvas";
import {
  bezierCurve,
  doTheDamnDrawThing,
  drawCircle,
  fillCircle,
  Point,
  straight,
  writeText,
} from "./drawUtils";
import { FPUtils, range } from "./fpUtils";

export type BSTNode = {
  value: number;
  left?: BSTNode;
  right?: BSTNode;
};

export const node = (
  value: number,
  left?: BSTNode,
  right?: BSTNode,
): BSTNode => ({ value, left, right });

const _height = (curDepth: number, node?: BSTNode): number =>
  node
    ? Math.max(_height(curDepth, node.left), _height(curDepth, node.right)) + 1
    : curDepth;

export const height = (node?: BSTNode): number => _height(0, node);

export type ResultArr = Array<Array<BSTNode | null>>;

function inorder(row: number, col: number, ans: ResultArr, node?: BSTNode) {
  if (!node) return;
  ans[row][col] = node;
  inorder(row + 1, col * 2, ans, node.left);
  inorder(row + 1, col * 2 + 1, ans, node.right);
}

export function treeToMatrix(root?: BSTNode): ResultArr {
  let ans: ResultArr = Array.from(range(0, height(root)), (_, i) =>
    Array(2 ** i).fill(null),
  );
  inorder(0, 0, ans, root);
  return ans;
}

export const traverse = (cb: (node: BSTNode) => void, root?: BSTNode) => {
  if (!root) return;
  traverse(cb, root.left);
  cb(root);
  traverse(cb, root.right);
};

export const adjacencyList = (root?: BSTNode) => {
  const result: Map<number, { children: number[] }> = new Map();
  const cb = (node: BSTNode) => {
    const children = [];
    if (node.left) children.push(node.left.value);
    if (node.right) children.push(node.right.value);
    result.set(node.value, { children });
  };
  traverse(cb, root);
  return result;
};

export const treeXCoefs = (root?: BSTNode) => {
  const gen = FPUtils.half(1)();
  var h = height(root);
  const acc = [];
  while (h > 0) {
    acc.push(gen.next().value);
    h--;
  }
  return acc.flat();
};

function* yCoefGenerator(coefPerLevel: number): Generator<number[]> {
  let level = 0;
  while (true) {
    yield new Array(Math.pow(2, level)).fill((1 + level) * coefPerLevel);
    level++;
  }
}

export const treeYCoefs = (root?: BSTNode): number[] => {
  const gen = yCoefGenerator(0.2);
  var h = height(root);
  const acc = [];
  while (h > 0) {
    acc.push(gen.next().value);
    h--;
  }
  return acc.flat();
};

const multiply = (first: number) => (second: number) => first * second;

export type DrawableNode = {
  point: Point;
  value: number;
  children: number[];
};

export const zipTree = ({
  height,
  width,
  root,
}: {
  height: number;
  width: number;
  root?: BSTNode;
}): DrawableNode[] => {
  const xCoords = map(multiply(width), treeXCoefs(root));
  const yCoords = map(multiply(height), treeYCoefs(root));

  const matrix: Array<BSTNode | null> = treeToMatrix(root).flat();

  const children = matrix.map((e) => {
    const childVals = [];
    if (e?.left) childVals.push(e.left.value);
    if (e?.right) childVals.push(e.right.value);
    return childVals;
  });

  const values = matrix.map((e) => e?.value);

  return range(0, xCoords.length)
    .map((i) => {
      if (xCoords[i] && yCoords[i] && values[i] && children[i]) {
        return {
          point: {
            x: xCoords[i],
            y: yCoords[i],
          },
          value: values[i],
          children: children[i],
        };
      } else {
        return null;
      }
    })
    .filter((x) => !!x);
};

type Color =
  | "yellow"
  | "lightblue"
  | "green"
  | "red"
  | "orange"
  | "purple"
  | "teal"
  | "blue"
  | "black";

export type DrawOpts = {
  color: Color;
  border: Color;
};

export type EdgeType = "bezier" | "straight";

export type EdgeOpts = {
  type: EdgeType;
  color: Color;
};

export type DrawableNodeOpts = {
  default: DrawOpts;
  highlighted: DrawOpts;
  radius: number;
  edges: EdgeOpts;
  isHighlighted: (value: number) => boolean;
};

export const buildDrawer = (opts: DrawableNodeOpts) => {
  return function (value: number, map: Map<number, DrawableNode>): Drawable {
    const drawableNode = map.get(value) as DrawableNode;
    const theme = opts.isHighlighted(value) ? opts.highlighted : opts.default;
    const fill = fillCircle(theme.color);
    const border = drawCircle(theme.border);

    const drawEdge =
      opts.edges.type === "straight"
        ? straight(opts.edges.color)
        : bezierCurve(opts.edges.color);

    const from = {
      x: drawableNode.point.x,
      y: drawableNode.point.y + opts.radius,
    };

    return (ctx) => {
      doTheDamnDrawThing(
        fill({ point: drawableNode.point, radius: opts.radius }),
        border({ point: drawableNode.point, radius: opts.radius }),
        writeText({
          point: drawableNode.point,
          fontSize: 20,
          value: drawableNode.value,
        }),
      )(ctx);

      drawableNode.children
        .map((child) => map.get(child)!.point as Point)
        .map((childPoint) => ({
          from,
          to: { x: childPoint.x, y: childPoint.y },
        }))
        .forEach((path) => drawEdge(path)(ctx));
    };
  };
};

export function treeToDrawableMap(
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
