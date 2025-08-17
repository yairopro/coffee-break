import type { AnyFn } from "./fn";

export type asyncfy<F extends AnyFn> = (...params: Parameters<F>) => Promise<ReturnType<F>>;