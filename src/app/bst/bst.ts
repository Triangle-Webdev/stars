export class TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;

  constructor(value: number, left?: TreeNode, right?: TreeNode) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const sort = (a: number, b: number) => a - b;

export class BST {
  root?: TreeNode;

  constructor(arr: number[]) {
    this.root = BST.recursiveArrToTree([...new Set(arr)].toSorted(sort));
  }

  private static recursiveArrToTree(arr: number[]): TreeNode | undefined {
    if (arr.length === 0) return;
    if (arr.length === 1) return new TreeNode(arr[0]);

    const mid = Math.floor(arr.length / 2);
    return new TreeNode(
      arr[mid],
      this.recursiveArrToTree(arr.slice(0, mid)),
      this.recursiveArrToTree(arr.slice(mid + 1, arr.length)),
    );
  }
}
