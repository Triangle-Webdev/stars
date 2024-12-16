type Point = { x: number; y: number };

type Drawable = {
  ctx: CanvasRenderingContext2D;
};

type BezierCurveParams = {
  start: Point;
  end: Point;
} & Drawable;

export const drawBezierCurve = ({ ctx, start, end }: BezierCurveParams) => {
  const xHalf = (start.x + end.x) / 2;
  const yHalf = (start.y + end.y) / 2;

  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.moveTo(start.x, start.y);
  ctx.bezierCurveTo(xHalf, yHalf, end.x, yHalf, end.x, end.y);
  ctx.stroke();
};

type WriteParams = {
  x: number;
  y: number;
  fontSize: number;
  value: string | number;
};

type CircleParams = {
  x: number;
  y: number;
  radius: number;
};

export const fillCircle = ({ ctx, x, y, radius }: CircleParams & Drawable) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "lightblue";
  ctx.fill();
};

export const drawCircle = ({ ctx, x, y, radius }: CircleParams & Drawable) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = "purple";
  ctx.stroke();
};

export const writeText = ({
  ctx,
  x,
  y,
  fontSize,
  value,
}: WriteParams & Drawable) => {
  ctx.font = `${fontSize}pt serif`;
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(`${value}`, x, y + fontSize / 2);
};
