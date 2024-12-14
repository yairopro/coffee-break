export type fn<P extends any[] | void = void, R = void> = (...params: P extends void ? [] : P) => R;
export type AnyFn = fn<any, any>;