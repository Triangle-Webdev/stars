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

const _findDepth = (curDepth: number, node?: BSTNode): number =>
  node
    ? Math.max(
        _findDepth(curDepth, node.left),
        _findDepth(curDepth, node.right),
      ) + 1
    : curDepth;

export const findDepth = (node?: BSTNode): number => _findDepth(0, node);

export type Vertice = {
  value: number;
  xOffset: number;
  yOffset: number;
  edges: number[];
};
export type Graph = Map<number, Vertice>;

export const calculateChildOffset = (
  parentXOffset: number,
  depth: number,
): {
  left: number;
  right: number;
} => {
  const additionalOffset = 1 / 2 ** (depth + 1);
  return {
    left: parentXOffset - additionalOffset,
    right: parentXOffset + additionalOffset,
  };
};

const _calculateNodePositions = ({
  value,
  left,
  right,
  depth,
  xOffset,
  adjacencyList,
}: BSTNode & {
  depth: number;
  xOffset: number;
  adjacencyList: Graph;
}): Graph => {
  let edges: number[] = [];
  const nextCoords = calculateChildOffset(xOffset, depth);
  if (left) {
    edges.push(left.value);
    _calculateNodePositions({
      ...left,
      depth: depth + 1,
      xOffset: nextCoords.left,
      adjacencyList,
    });
  }
  if (right) {
    edges.push(right.value);
    _calculateNodePositions({
      ...right,
      depth: depth + 1,
      xOffset: nextCoords.right,
      adjacencyList,
    });
  }
  adjacencyList.set(value, {
    value,
    xOffset,
    yOffset: (depth - 1) * 0.1,
    edges,
  });
  return adjacencyList;
};

export const calculateNodePositions = ({
  value,
  left,
  right,
}: BSTNode): Graph => {
  return _calculateNodePositions({
    value,
    left,
    right,
    depth: 1,
    xOffset: 0.5,
    adjacencyList: new Map(),
  });
};
