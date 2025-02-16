import forkFn from "../function/forkFn";
import type { AnyFn } from "../type/fn";

export default function logCalls<F extends AnyFn>(fn: F, name?: string) {
	return forkFn(fn, {
		success(params, output) {
			console.log(`✅ ${name || fn.name}():`, {
				params, output
			});
		},
		fail(params, error) {
			console.warn(`❌ ${name || fn.name}():`, {
				params, error
			});
		}
	}) as F;
}