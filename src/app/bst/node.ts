export type BSTNode = {
  value: number;
  left?: BSTNode;
  right?: BSTNode;
};

export const createNode = (
  value: number,
  left?: BSTNode,
  right?: BSTNode,
): BSTNode => ({ value, left, right });

const _findDepth = (curDepth: number, node?: BSTNode): number => {
  if (!node) return curDepth;
  if (!node.left && !node.right) return curDepth + 1;

  let leftDepth = _findDepth(curDepth + 1, node.left);
  let rightDepth = _findDepth(curDepth + 1, node.right);
  return Math.max(leftDepth, rightDepth);
};

export const findDepth = (node?: BSTNode): number => _findDepth(0, node);

export type Vertice = {
  value: number;
  xOffset: number;
  yOffset: number;
  edges: number[];
};
export type Graph = Map<number, Vertice>;

export const calculateNodePositions = ({
  value,
  left,
  right,
}: BSTNode): Graph => {
  const maxDepth = findDepth({ value, left, right });
  const levelCoefficient = 1.0 / maxDepth;
  const maxNodesInRow = maxDepth ** 2;
  const widthCoeffecient = 1.0 / maxNodesInRow;

  const adjacencyList: Graph = new Map();
  const firstRowOffset = 1 / 2;
  const secondRowOffset = 1 / 3;
  const thirdRowOffset = 1 / 5;

  const xStart = 0;
  const xEnd = 1.0;
  const xPos = (xStart + xEnd) / 2;

  adjacencyList.set(value, { value, xOffset: 0.5, yOffset: 0, edges: [2, 3] });
  adjacencyList.set(2, {
    value: 2,
    xOffset: 0.25,
    yOffset: 0.1,
    edges: [4, 5],
  });
  adjacencyList.set(3, {
    value: 3,
    xOffset: 0.75,
    yOffset: 0.1,
    edges: [6, 7],
  });
  adjacencyList.set(4, {
    value: 4,
    xOffset: 0.125,
    yOffset: 0.2,
    edges: [],
  });
  adjacencyList.set(5, {
    value: 5,
    xOffset: 0.375,
    yOffset: 0.2,
    edges: [],
  });
  adjacencyList.set(6, {
    value: 6,
    xOffset: 0.625,
    yOffset: 0.2,
    edges: [],
  });
  adjacencyList.set(7, {
    value: 7,
    xOffset: 0.875,
    yOffset: 0.2,
    edges: [],
  });

  return adjacencyList;
};
