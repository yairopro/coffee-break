import type { fn } from "../type/fn";
import Hub from "./Hub";

export default function Container<T>(initialValue: T) {
	let content = initialValue;
	const hub = Hub<T>();

	return {
		get content() {
			return content;
		},

		set content(newValue) {
			if (newValue !== content) {
				content = newValue;
				hub.broadcast(newValue);
			}
		},

		listen(listener: fn<[T]>) {
			return hub.plug(listener);
		},
	};
}
