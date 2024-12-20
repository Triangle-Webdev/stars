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

export type ResultArr = Array<Array<number | null>>;

function inorder(row: number, col: number, ans: ResultArr, node?: BSTNode) {
  if (!node) return;
  ans[row][col] = node.value;
  inorder(row + 1, col * 2, ans, node.left);
  inorder(row + 1, col * 2 + 1, ans, node.right);
}

export function treeToMatrix(root?: BSTNode) {
  let ans = Array.from(range(0, height(root)), (_, i) =>
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
    if (!!node.left) children.push(node.left.value);
    if (!!node.right) children.push(node.right.value);
    result.set(node.value, { children });
  };
  traverse(cb, root);
  return result;
};
