import makePromise from "@coffee-break/toolbox/promise/makePromise";
import { SECOND_MS } from "@coffee-break/toolbox/time/constants";
import type { fn } from "@coffee-break/toolbox/type/fn";
import { geolocationContainer } from "./container";


/**
 * ```
 * useEffect(() => watchGeolocation(setGeolocation).catch(setError), []);
 * ```
 */
export default function watchGeolocation(callback: PositionCallback) {
	const [promise, resolve, reject] = makePromise<void>();

	const key = navigator.geolocation.watchPosition(position => {
		geolocationContainer.content = position;
		callback(position);
	}, reject, {
		enableHighAccuracy: true,
		maximumAge: 5 * SECOND_MS,
	});

	function unwatch() {
		navigator.geolocation.clearWatch(key);
		resolve();
	}

	unwatch.catch = ((callback: fn<[unknown]>) => {
		promise.catch(callback);
		return unwatch;
	});

	return unwatch;
}