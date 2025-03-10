export default function forkFn<I extends any[], O>(fn: ((...p: I) => O) | ((...p: I) => Promise<O>), config?: ForkConfig<I, O>) {
	const { success, fail } = config ?? {};
	if (!success && !fail) return fn;


	return function (...params: I) {
		let output: O | Promise<O>;

		try {
			output = fn(...params);
		}
		catch (error: unknown) {
			fail?.(params, error);
			throw error;
		}

		new Promise<void>((resolve) => { // safe sync scope
			if (output instanceof Promise) {
				const onFulfilled = success && function (result: O) {
					success(params, result);
				};

				const onRejected = fail && function (reason: unknown) {
					fail(params, reason);
				}

				output.then(onFulfilled, onRejected);
			}
			else
				success?.(params, output);

			resolve();
		});

		return output;
	};
}

export interface ForkConfig<I extends any[], O> {
	success?(input: I, output: O): void,
	fail?(input: I, reason: unknown): void,
}