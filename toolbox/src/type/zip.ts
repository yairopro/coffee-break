export type zip<A extends any[], B extends any[]> = A extends [infer a, ...infer ra]
  ? // zip a with b
    B extends [infer b, ...infer rb]
    ? [[a, b], ...zip<ra, rb>]
    : // nothing left in B
      A extends [infer a, ...infer ra]
      ? [[a, undefined], ...zip<ra, []>]
      : []
  : // nothing left in A
    B extends [infer b, ...infer rb]
    ? [[undefined, b], ...zip<[], rb>]
    : [];

export type strictZip<A extends any[], B extends any[]> = A extends [infer a, ...infer ra]
  ? // zip a with b
    B extends [infer b, ...infer rb]
    ? [[a, b], ...zip<ra, rb>]
    : // nothing left in B
      []
  : // nothing left in A
    [];
