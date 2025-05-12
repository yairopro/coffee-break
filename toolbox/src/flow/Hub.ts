import willTryCatch from "../error/willTryCatch";
import type { fn } from "../type/fn";

export default function Hub<T = void>() {
	type Listener = fn<[T]>;
	const listeners: Array<Listener> = [];

	return {
		plug(listener: Listener) {
			const entry = willTryCatch(listener, logError);
			listeners.push(entry);

			return function unplug() {
				const index = listeners.indexOf(entry);
				if (index >= 0)
					listeners.splice(index, 1);
			};
		},

		broadcast(payload: T) {
			listeners.forEach((listener) => listener(payload));
		},
	};
}

function logError(error: unknown) {
	console.error("Error during Hub broadcast: ", error);
}
