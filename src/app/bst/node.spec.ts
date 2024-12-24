import { zip } from "./fpUtils";
import {
  node,
  height,
  treeToMatrix,
  rowGenerator,
  BSTNode,
  traverse,
  adjacencyList,
  treeXCoefs,
  treeYCoefs,
  zipTree,
} from "./node";

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

  describe("inOrderArray", () => {
    it("should work", () => {
      const root = node(2, node(1), node(3));
      const expected = [[2], [1, 3]];
      const actual = treeToMatrix(root);
      expect(actual).toEqual(expected);
    });

    it("should place nulls in result when there is no node", () => {
      const root = node(2, undefined, node(3));
      const expected = [[2], [null, 3]];
      expect(treeToMatrix(root)).toEqual(expected);
    });

    it("should place nulls in result when there are nested nulls", () => {
      const root = node(2, undefined, node(3, node(4)));
      const expected = [[2], [null, 3], [null, null, 4, null]];
      const actual = treeToMatrix(root);
      expect(actual).toEqual(expected);
    });
  });

  describe("rowGenerator", () => {
    it("should return all values not appearing in the previous row +/- the offset", () => {
      const generator = rowGenerator();
      expect(generator.next().value).toEqual([0.5]);
      expect(generator.next().value).toEqual([0.25, 0.75]);
      expect(generator.next().value).toEqual([0.125, 0.375, 0.625, 0.875]);
    });
  });

  describe("zip", () => {
    it("should join two lists", () => {
      const input1 = [1, 2, 3];
      const input2 = ["a", "b", "c"];
      const expected = [
        [1, "a"],
        [2, "b"],
        [3, "c"],
      ];
      expect(zip(input1, input2)).toEqual(expected);
    });
  });

  describe("traverse", () => {
    it("should perform callback on all nodes in order", () => {
      const root = node(2, node(1), node(3));
      const collection: number[] = [];
      const cb = (node: BSTNode) => collection.push(node.value);
      const expected = [1, 2, 3];
      traverse(cb, root);
      expect(collection).toEqual(expected);
    });

    it("should collect all children", () => {
      const root = node(2, node(1), node(3));
      const expected = new Map();
      expected.set(2, { children: [1, 3] });
      expected.set(1, { children: [] });
      expected.set(3, { children: [] });
      const actual = adjacencyList(root);
      expect(actual).toEqual(expected);
    });
  });

  describe("treeYcoefs", () => {
    it("should return y values", () => {
      const expected = [0.2];
      const actual = treeYCoefs(node(2));
      expect(expected).toEqual(actual);
    });

    it("should flatten y values array", () => {
      const expected = [0.2, 0.4, 0.4];
      const actual = treeYCoefs(node(2, node(1), node(3)));
      expect(expected).toEqual(actual);
    });
  });

  describe("treeXcoefs", () => {
    it("should return x values", () => {
      const expected = [0.5];
      const actual = treeXCoefs(node(2));
      expect(expected).toEqual(actual);
    });

    it("should flatten x values array", () => {
      const expected = [0.5, 0.25, 0.75];
      const actual = treeXCoefs(node(2, node(1), node(3)));
      expect(expected).toEqual(actual);
    });
  });

  describe("zipTree", () => {
    it("should return the points in a tree", () => {
      const point = { x: 0.5, y: 0.2, value: 2 };
      const expected = [point];
      const actual = zipTree({ height: 1, width: 1, root: node(2) });
      expect(expected).toEqual(actual);
    });

    it("should return the points in a tree with children", () => {
      const p1 = { x: 0.5, y: 0.2, value: 2 };
      const p2 = { x: 0.25, y: 0.4, value: 1 };
      const p3 = { x: 0.75, y: 0.4, value: 3 };
      const expected = [p1, p2, p3];
      const actual = zipTree({
        height: 1,
        width: 1,
        root: node(2, node(1), node(3)),
      });
      expect(expected).toEqual(actual);
    });
  });
});
