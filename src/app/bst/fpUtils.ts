export const range = (start: number, stop: number, step: number = 1) =>
  Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step,
  );

export const zip = <T, U>(list1: Array<T>, list2: Array<U>): Array<[T, U]> =>
  Array.from({ length: Math.min(list1.length, list2.length) }, (_, i) => [
    list1[i],
    list2[i],
  ]);

export const zip3 = <T, U, V>(
  list1: Array<T>,
  list2: Array<U>,
  list3: Array<V>,
): Array<[T, U, V]> =>
  Array.from(
    { length: Math.min(list1.length, Math.min(list2.length, list3.length)) },
    (_, i) => [list1[i], list2[i], list3[i]],
  );

export const half = (num: number) => {
  return function* () {
    let denominator = num;
    let existing: Set<number> = new Set();

    while (true) {
      denominator = denominator * 2;
      const possibleXValues = new Set(
        range(1, denominator).map((i) => i / denominator),
      );
      yield Array.from(possibleXValues).filter((e) => !existing.has(e));
      existing = new Set(possibleXValues);
    }
  };
};

export const FPUtils = {
  range,
  zip,
  zip3,
  half,
};
