export type BSTNode<T> = {
  left: BSTNode<T> | null;
  right: BSTNode<T> | null;
  value: T;
};

export const createNode = <T>(
  value: T,
  left: BSTNode<T> | null,
  right: BSTNode<T> | null,
): BSTNode<T> => ({ value, left, right });

const _findDepth = (
  node: BSTNode<unknown> | null,
  curDepth: number,
): number => {
  if (!node) return curDepth;
  if (!node.left && !node.right) return curDepth + 1;

  let leftDepth = node.left ? _findDepth(node.left, curDepth + 1) : curDepth;
  let rightDepth = node.right ? _findDepth(node.right, curDepth + 1) : curDepth;
  return Math.max(leftDepth, rightDepth);
};

export const findDepth = (node: BSTNode<unknown> | null): number =>
  _findDepth(node, 0);

export const calculateNodePositions = ({
  value,
  left,
  right,
}: BSTNode<string | number>): {
  value: string | number;
  xOffset: number;
  yOffset: number;
}[] => {
  const maxDepth = findDepth({ value, left, right });
  const levelCoefficient = 1.0 / maxDepth;
  const maxNodesInRow = maxDepth ** 2;
  const widthCoeffecient = 1.0 / maxNodesInRow;

  const result: { value: string | number; xOffset: number; yOffset: number }[] =
    [];
  result.push({ value, xOffset: 0.5, yOffset: 0 });
  result.push({ value: 2, xOffset: 0.6, yOffset: 0.1 });
  result.push({ value: 3, xOffset: 0.4, yOffset: 0.1 });
  result.push({ value: 4, xOffset: 0.7, yOffset: 0.2 });
  result.push({ value: 5, xOffset: 0.3, yOffset: 0.2 });
  result.push({ value: 6, xOffset: 0.5, yOffset: 0.2 });
  result.push({ value: 7, xOffset: 0.5, yOffset: 0.2 });

  return result;
};
