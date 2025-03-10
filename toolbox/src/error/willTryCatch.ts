import { nthArg, pipe } from "ramda";
import type { AnyFn, fn } from "../type/fn";

export default function willTryCatch<const F extends AnyFn>(fn: F, onError: fn<[unknown, Parameters<F>], ReturnType<F> | undefined | void> = DEFAULT_ON_ERROR) {
	return function (...params: Parameters<F>) {
		try {
			return fn(...params);
		}
		catch (error) {
			return onError?.(error, params) as ReturnType<F> | undefined;
		}
	};
}

const DEFAULT_ON_ERROR = pipe(nthArg(0), console.warn);