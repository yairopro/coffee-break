export default function makePromise<T>() {
	let resolve: (result: T) => void;
	let reject: (reason: unknown) => void;

	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	promise.then.bind(promise);
	promise.catch.bind(promise);
	promise.finally.bind(promise);

	return [
		promise,
		resolve!,
		reject!,
	] as const;
}