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
			const notify = willTryCatch(listener, logError);
			listeners.add(notify);
			return () => listeners.delete(notify);
		},

		broadcast(payload: T) {
			listeners.forEach((notify) => notify(payload));
		},
	};
}

function logError(error: unknown) {
	console.error("Error during Hub broadcast: ", error);
}
