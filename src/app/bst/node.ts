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

export type Vertice = {
  value: number;
  xOffset: number;
  yOffset: number;
  edges: number[];
};

export type Graph = Map<number, Vertice>;

export const childOffset = (
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

const yOffset = (maxDepth: number) => (curDepth: number) =>
  (curDepth - 1) / maxDepth;

const _nodePositions = ({
  value,
  left,
  right,
  depth,
  xOffset,
  adjacencyList,
  calcYOffset,
}: BSTNode & {
  depth: number;
  xOffset: number;
  adjacencyList: Graph;
  calcYOffset: (curDepth: number) => number;
}): Graph => {
  let edges: number[] = [];
  const childCoords = childOffset(xOffset, depth);
  if (left) {
    edges.push(left.value);
    _nodePositions({
      ...left,
      depth: depth + 1,
      xOffset: childCoords.left,
      adjacencyList,
      calcYOffset,
    });
  }
  if (right) {
    edges.push(right.value);
    _nodePositions({
      ...right,
      depth: depth + 1,
      xOffset: childCoords.right,
      adjacencyList,
      calcYOffset,
    });
  }
  adjacencyList.set(value, {
    value,
    xOffset,
    yOffset: calcYOffset(depth),
    edges,
  });
  return adjacencyList;
};

export const nodePositions = ({ value, left, right }: BSTNode): Graph => {
  return _nodePositions({
    value,
    left,
    right,
    depth: 1,
    xOffset: 0.5,
    adjacencyList: new Map(),
    calcYOffset: yOffset(height({ value, left, right })),
  });
};
