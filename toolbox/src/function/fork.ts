export function fork<P extends any[]>(fn: (...p: P) => unknown) {
	return function forked(...params: P) {
		fn(...params);
		return params[0];
	}
}