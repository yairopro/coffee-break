import { HOUR_MS, SECOND_MS } from "@coffee-break/toolbox/time/constants"

export default async function getGeolocation(fresh?: boolean) {
	return new Promise<GeolocationPosition>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, {
			maximumAge: fresh ? 0 : HOUR_MS,
			enableHighAccuracy: fresh,
			timeout: 30 * SECOND_MS,
		});
	});
}