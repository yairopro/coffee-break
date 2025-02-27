import willTryCatch from "../error/willTryCatch";
import type { fn } from "../type/fn";

/**
 * Hub factory.
 */
export default function Hub<T = void>() {
	type Listener = fn<[T]>;
	const listeners = new Set<Listener>();

	return {
		plug(listener: Listener) {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},

		broadcast(payload: T) {
			listeners.forEach((listener) => willTryCatch(listener, logError)(payload));
		},
	};
}

function logError(error: unknown) {
	console.error("Error during Hub broadcast: ", error);
}
