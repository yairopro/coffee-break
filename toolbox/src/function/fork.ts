export function fork<I>(fn: (input: I) => void) {
	return function forked(input: I) {
		fn(input);
		return input;
	}
}