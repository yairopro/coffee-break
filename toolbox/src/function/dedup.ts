import type { AnyFn, fn } from "../type/fn";

/**
 * HOF to deduplicate async-functions calls.
 **/
export default function dedup<F extends AnyFn>(fn: F) {
	let promise: Promise<unknown> | undefined;

	return function (...params: unknown[]) {
		if (!promise) {
			const output = fn(...params);
			const isOutputPromise = output instanceof Promise;
			if (!isOutputPromise) return output; // sync

			promise = output;
			promise.finally(() => promise = undefined)
		}

		return promise;
	} as F;
}
