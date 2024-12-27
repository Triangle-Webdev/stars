import { BST, TreeNode } from "./bst";

const prettyPrint = (node?: TreeNode, prefix = "", isLeft = true) => {
  if (!node) {
    return;
  }
  if (node.right) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

describe("bst", () => {
  it("should be instiantiable", () => {
    const input = [1, 2, 3];
    const expected = new TreeNode(
      2,
      new TreeNode(1, undefined, undefined),
      new TreeNode(3, undefined, undefined),
    );
    const actual = BST.recursiveArrToTree(input);
    expect(actual).toEqual(expected);
  });

  it("should work", () => {
    const input = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    // console.log(BST.recursiveArrToTree(input));
    prettyPrint(BST.recursiveArrToTree(input));
  });
});
