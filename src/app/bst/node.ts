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

export const range = (start: number, stop: number, step: number = 1) =>
  Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step,
  );

export function treeToMatrix(root?: BSTNode) {
  let ans = Array.from(range(0, height(root)), (_, i) =>
    Array(2 ** i).fill(null),
  );
  inorder(0, 0, ans, root);
  return ans;
}

export function* rowGenerator() {
  let denominator = 1;
  let existing: Set<number> = new Set();

  while (true) {
    denominator = denominator * 2;
    const possibleXValues = new Set(
      range(1, denominator).map((i) => i / denominator),
    );
    yield Array.from(possibleXValues).filter((e) => !existing.has(e));
    existing = new Set(possibleXValues);
  }
}
