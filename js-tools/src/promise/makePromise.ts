export default function makePromise<T>() {
	let resolve: (result: T) => void;
	let reject: (reason: unknown) => void;

	let promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return [
		promise,
		resolve!,
		reject!,
	] as const;
}