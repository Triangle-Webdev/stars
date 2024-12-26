export type Point = { x: number; y: number };

type Drawable = (ctx: CanvasRenderingContext2D) => void;

type LineParams = {
  from: Point;
  to: Point;
};

type Line = (
  color: string,
) => ({ from, to }: LineParams) => (ctx: CanvasRenderingContext2D) => void;

export const bezierCurve: Line =
  (color) =>
  ({ from, to }) =>
  (ctx) => {
    const xHalf = (from.x + to.x) / 2;
    const yHalf = (from.y + to.y) / 2;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(from.x, from.y);
    ctx.bezierCurveTo(xHalf, yHalf, to.x, yHalf, to.x, to.y);
    ctx.stroke();
  };

export const straight: Line =
  (color) =>
  ({ from, to }) =>
  (ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
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

export const fillCircle =
  (color: string) =>
  ({ point, radius }: CircleParams) =>
  (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  };

export const drawCircle =
  (color: string) =>
  ({ point, radius }: CircleParams) =>
  (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = color;
    ctx.stroke();
  };

export const writeText =
  ({ point, fontSize, value }: WriteParams) =>
  (ctx: CanvasRenderingContext2D) => {
    ctx.font = `${fontSize}pt serif`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`${value}`, point.x, point.y + fontSize / 2);
  };

export const doTheDamnDrawThing =
  (...fns: Drawable[]): Drawable =>
  (ctx) =>
    fns.forEach((fn) => fn(ctx));
