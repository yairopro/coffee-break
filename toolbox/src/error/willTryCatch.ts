import type { AnyFn, fn } from "../type/fn";

export default function willTryCatch<const F extends AnyFn>(fn: F, onError?: fn<[unknown, Parameters<F>], ReturnType<F> | undefined>) {
	return function (...params: Parameters<F>) {
		try {
			return fn(...params);
		}
		catch (error) {
			return onError?.(error, params);
		}
	} as F;
}