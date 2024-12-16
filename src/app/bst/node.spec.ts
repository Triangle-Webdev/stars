import { childOffset, nodePositions, node, height } from "./node";

describe("node logic", () => {
  describe("findDepth", () => {
    it("should return 0 for the height when node is null", () => {
      expect(height()).toBe(0);
    });

    it("should return 1 for the height when node is a leaf", () => {
      expect(height(node(1))).toBe(1);
    });

    it("should return 2 for the height when node has a child", () => {
      expect(height(node(1, node(2)))).toBe(2);
    });

    it("should return 3 for the height when node is a grandparent", () => {
      expect(height(node(1, node(2, node(3))))).toBe(3);
    });

    it("should return 3 for the height when left side depth is 2 and right side depth is 3", () => {
      expect(height(node(1, node(2), node(4, node(5))))).toBe(3);
    });
  });

  describe("calculateChildOffset", () => {
    it.each([
      [0.5, 1, { left: 0.25, right: 0.75 }],
      [0.25, 2, { left: 0.125, right: 0.375 }],
      [0.75, 2, { left: 0.625, right: 0.875 }],
    ])(
      "takes coords start %i and end %i to calculate child position %i",
      (xStart, xEnd, expected) => {
        expect(childOffset(xStart, xEnd)).toEqual(expected);
      },
    );
  });

  describe("calculateNodePositions", () => {
    it("should return offset 0, 0 for root node", () => {
      const expected = new Map();
      expected.set(1, { value: 1, xOffset: 0.5, yOffset: 0, edges: [] });
      const actual = nodePositions(node(1));
      expect(actual).toEqual(expected);
    });

    it("should have an edge when a node has a child", () => {
      const expected = new Map();
      expected.set(1, { value: 1, xOffset: 0.5, yOffset: 0, edges: [2] });
      expected.set(2, { value: 2, xOffset: 0.25, yOffset: 0.5, edges: [] });
      const actual = nodePositions(node(1, node(2)));
      expect(actual).toEqual(expected);
    });

    it("should have two edges when a node has two children", () => {
      const expected = new Map();
      expected.set(1, { value: 1, xOffset: 0.5, yOffset: 0, edges: [2, 3] });
      expected.set(2, { value: 2, xOffset: 0.25, yOffset: 0.5, edges: [] });
      expected.set(3, { value: 3, xOffset: 0.75, yOffset: 0.5, edges: [] });
      const actual = nodePositions(node(1, node(2), node(3)));
      expect(actual).toEqual(expected);
    });
  });
});
