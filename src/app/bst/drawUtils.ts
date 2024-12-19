import { BSTNode, range, ResultArr } from "./node";

export type Point = { x: number; y: number };

type Drawable = {
  ctx: CanvasRenderingContext2D;
};

type CurveParams = {
  from: Point;
  to: Point;
};

type Curve = (
  color: string,
) => (ctx: CanvasRenderingContext2D) => ({ from, to }: CurveParams) => void;

export const bezierCurve: Curve =
  (color) =>
  (ctx) =>
  ({ from, to }) => {
    const xHalf = (from.x + to.x) / 2;
    const yHalf = (from.y + to.y) / 2;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(from.x, from.y);
    ctx.bezierCurveTo(xHalf, yHalf, to.x, yHalf, to.x, to.y);
    ctx.stroke();
  };

type WriteParams = {
  point: Point;
  fontSize: number;
  value: string | number;
};

type CircleParams = {
  point: Point;
  radius: number;
};

export const fillCircle = ({ ctx, point, radius }: CircleParams & Drawable) => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "lightblue";
  ctx.fill();
};

export const drawCircle = ({ ctx, point, radius }: CircleParams & Drawable) => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = "purple";
  ctx.stroke();
};

export const writeText = ({
  ctx,
  point,
  fontSize,
  value,
}: WriteParams & Drawable) => {
  ctx.font = `${fontSize}pt serif`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(`${value}`, point.x, point.y + fontSize / 2);
};

const bstXOffsets = (arr: ResultArr) => {
  let curCoef = 1;
  return arr.map((row, i) => row.length);
};

export const drawBST = (arr: ResultArr) => {
  let curCoef = 1;
  for (const row in arr) {
  }
};
