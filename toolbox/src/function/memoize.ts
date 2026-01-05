import type { AnyFn } from "../type/fn";

export default function memoize<const F extends AnyFn>(fn: F, config?: MemoizationConfig) {
	const rootEntry = new MemoizationEntry(config);

	return function (...params: unknown[]) {
		let output = rootEntry.read(params);
		if (output === NOT_RUNNED) {
			output = fn(...params);
			rootEntry.write(params, output);
		}

		return output;
	} as F;
}

const NOT_RUNNED = {};

class MemoizationEntry {
	private value: unknown = NOT_RUNNED;
	private subEntries = new Map<unknown, MemoizationEntry>();

	constructor(private config?: MemoizationConfig) { }

	read(path: unknown[]): unknown {
		if (!path.length) return this.value;

		const [nextNode, ...restPath] = path;
		const subEntry = this.subEntries.get(nextNode);
		if (!subEntry) return NOT_RUNNED;

		return subEntry.read(restPath);
	}

	write(path: unknown[], value: unknown): unknown {
		if (!path.length) {
			this.value = value;
			return;
		}

		const [nextNode, ...restPath] = path;
		let subEntry = this.subEntries.get(nextNode);
		if (!subEntry) this.subEntries.set(nextNode, (subEntry = new MemoizationEntry(this.config)));

		subEntry.write(restPath, value);
		//! TODO clean after duration
	}
}

type MemoizationConfig = {
	/**
	 * Duration for memoizing an output
	 */
	duration: number;
};
