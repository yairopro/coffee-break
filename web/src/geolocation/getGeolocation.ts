import { HOUR_MS, SECOND_MS } from "@coffee-break/toolbox/time/constants"

export default async function getGeolocation(fresh?: boolean) {
	return new Promise<GeolocationPosition>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(position => {
			getGeolocation.last = position;
			resolve(position);
		}, reject, {
			maximumAge: fresh ? 0 : HOUR_MS,
			enableHighAccuracy: fresh,
			timeout: 30 * SECOND_MS,
		});
	});
}

getGeolocation.last = undefined as GeolocationPosition | undefined;