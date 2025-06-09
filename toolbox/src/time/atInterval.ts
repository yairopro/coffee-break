import type { fn } from "../type/fn";

export default function atInterval(run: fn, ms: number) {
	const key = setInterval(run, ms);
	return () => clearInterval(key);
}