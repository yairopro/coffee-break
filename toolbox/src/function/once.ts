import { is } from "ramda";
import type { AnyFn } from "../type/fn";

export default function once<F extends AnyFn>(run: F) {
	let output: unknown = NOT_RUNNED;
	return function runOnce(...params: Parameters<F>) {
		if (output === NOT_RUNNED) {
			output = run(...params);
			if (is(Promise, output))
				output.catch(() => output = NOT_RUNNED);
		}

		return output;
	} as F;
}

const NOT_RUNNED = {};