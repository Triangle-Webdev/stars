import { calculateNodePositions, createNode, findDepth } from "./node";

describe("node logic", () => {
  describe("findDepth", () => {
    it("should return 0 for the height when node is null", () => {
      expect(findDepth()).toBe(0);
    });

    it("should return 1 for the height when node is a leaf", () => {
      expect(findDepth(createNode(1))).toBe(1);
    });

    it("should return 2 for the height when node has a child", () => {
      expect(findDepth(createNode(1, createNode(2)))).toBe(2);
    });

    it("should return 3 for the height when node is a grandparent", () => {
      expect(findDepth(createNode(1, createNode(2, createNode(3))))).toBe(3);
    });

    it("should return 3 for the height when left side depth is 2 and right side depth is 3", () => {
      expect(
        findDepth(createNode(1, createNode(2), createNode(4, createNode(5)))),
      ).toBe(3);
    });
  });

  // @Todo fix this test to work with updated logic
  describe("calculateNodePositions", () => {
    it("should return offset 0, 0 for root node", () => {
      const expected = [{ value: 1, xOffset: 0.5, yOffset: 0 }];
      const actual = calculateNodePositions(createNode(1));
      expect(actual).toEqual(expected);
    });
  });
});
