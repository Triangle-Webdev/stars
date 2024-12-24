import { Point } from "./drawUtils";
import { FPUtils, range, zip3 } from "./fpUtils";

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

export const rowGenerator = FPUtils.half(1);

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
  const gen = rowGenerator();
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

export const DrawUtils = {
  scale:
    (size: number) =>
    (coefs: number[]): number[] =>
      coefs.map((x) => x * size),
};

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
  const xCoords = DrawUtils.scale(width)(treeXCoefs(root));
  const yCoords = DrawUtils.scale(height)(treeYCoefs(root));
  const matrix: Array<BSTNode> = treeToMatrix(root)
    .flat()
    .filter((e) => !!e);

  const children = matrix.map((e) => {
    const childVals = [];
    if (e.left) childVals.push(e.left.value);
    if (e.right) childVals.push(e.right.value);
    return childVals;
  });

  const values = matrix.map((e) => e.value);

  return range(0, xCoords.length).map((i) => ({
    point: {
      x: xCoords[i],
      y: yCoords[i],
    },
    value: values[i],
    children: children[i],
  }));
};
