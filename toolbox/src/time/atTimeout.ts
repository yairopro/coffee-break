import type { fn } from "../type/fn";

export default function atTimeout(run: fn, ms: number) {
	const key = setTimeout(run, ms);
	return () => clearTimeout(key);
}