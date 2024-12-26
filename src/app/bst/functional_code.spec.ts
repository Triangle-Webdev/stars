import { compose, curry } from "ramda";

describe("ramda", () => {
  it("should give some examples", () => {
    const match = curry((what: RegExp, s: string) => s.match(what));
    let res = match(/r/g, "hello world");
    console.log(res);
  });

  it("should give some examples of compose", () => {
    const g = (x: string) => x.length;
    const f = (x: number) => x === 4;
    const isFourLetters = compose(f, g);
    expect(isFourLetters("sam!")).toBeTruthy();
  });
});
