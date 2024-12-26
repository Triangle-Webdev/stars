import { curry } from "ramda";

export const Impure = {
  trace: curry((tag: string) => <T>(x: T): T => {
    console.log(tag, x);
    return x;
  }),
};
