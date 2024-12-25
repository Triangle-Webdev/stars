"use client";
import { useState } from "react";
import { Canvas } from "./canvas";
import { node, buildDrawer, treeToDrawableMap, traverse } from "./node";

const root = node(
  1,
  node(2, node(4, node(8), node(10)), node(5, undefined, node(9))),
  node(3, node(6), node(7)),
);

const BSTPage = () => {
  const [selected, setSelected] = useState(0);

  const defaultColors = { color: "lightblue", border: "purple" };
  const highlightedColors = { color: "yellow", border: "black" };

  const baseThemeOpts = {
    default: defaultColors,
    highlighted: highlightedColors,
    edges: {
      type: "bezier",
      color: "purple",
    },
    radius: 40,
    isHighlighted: (value: number) => selected === value,
  };

  const [theme, setTheme] = useState(() => baseThemeOpts);

  const nextNode = () => {
    setSelected(selected + 1);
    setTheme(() => ({
      ...baseThemeOpts,
      isHighlighted: (v: number) => selected + 1 === v,
    }));
  };

  const prevNode = () => {
    setSelected(selected - 1);
    setTheme(() => ({
      ...baseThemeOpts,
      isHighlighted: (v: number) => {
        return selected - 1 === v;
      },
    }));
  };

  let nodes: number[] = [];
  traverse((node) => nodes.push(node.value), root);

  const drawAction = (ctx: CanvasRenderingContext2D) => {
    const draw = buildDrawer(theme as any);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const map = treeToDrawableMap(ctx.canvas.width, ctx.canvas.height, root);
    map
      .keys()
      .map((k) => draw(k, map))
      .forEach((e) => e(ctx));
  };

  return (
    <div>
      <button onClick={prevNode}>prev</button>
      <button onClick={nextNode}>next</button>
      <Canvas drawAction={drawAction} />
    </div>
  );
};

export default BSTPage;
