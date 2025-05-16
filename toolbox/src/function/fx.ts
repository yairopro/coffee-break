import type { AnyFn } from "../type/fn";

// TODO rename
export async function runfx<T>(fn: () => T) {
	await 0;
	return fn();
}

export function fx<F extends AnyFn>(fn: F) {
	return (...params: Parameters<F>) => runfx(() => fn(...params));
}