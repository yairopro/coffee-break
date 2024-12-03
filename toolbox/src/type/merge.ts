/**
 * Merge types together, letting last type override previous ones.
 * ```
 * type A = {a: number};
 * type B = {a: string, b: number}
 * type C = {b: string, c: number}
 * type O = merge<[A, B, C]>
 * // prettify<O> = {a: string, b: string, c: number}
 * ```
 */
export type merge<T extends any[]> = T extends [infer A, infer B, ...infer R]
	? merge<[Omit<A, keyof B> & B, ...R]>
	: T extends [infer A]
	? A
	: {};
