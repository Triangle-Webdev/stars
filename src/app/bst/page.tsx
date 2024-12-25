"use client";
import { useState } from "react";
import { Canvas } from "./canvas";
import { node, buildDrawer, treeToDrawableMap } from "./node";

const root = node(
  1,
  node(2, node(4, node(8), node(10)), node(5, undefined, node(9))),
  node(3, node(6), node(7)),
);

const blueNodePurpleBorder = buildDrawer({
  color: (node) => "lightblue",
  border: (node) => "purple",
  radius: 40,
  edges: "bezier",
});

const greenNodeBlueBorder = buildDrawer({
  color: (node) => {
    return node.value === 2 ? "green" : "red";
  },
  border: (node) => "blue",
  radius: 40,
  edges: "straight",
});

const BSTPage = () => {
  const [state, setState] = useState(() => greenNodeBlueBorder);

  const drawAction = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const map = treeToDrawableMap(ctx.canvas.width, ctx.canvas.height, root);
    map
      .keys()
      .map((k) => state(k, map))
      .forEach((e) => e(ctx));
  };

  return (
    <div>
      <button onClick={() => setState(() => greenNodeBlueBorder)}>
        Click me blue
      </button>
      <button onClick={() => setState(() => blueNodePurpleBorder)}>
        Click me green
      </button>
      <Canvas drawAction={drawAction} />
    </div>
  );
};

export default BSTPage;
