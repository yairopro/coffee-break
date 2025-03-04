import { MS_HOUR, MS_SECOND } from "@coffee-break/toolbox/time/constants"

export default async function getGeolocation(fresh?: boolean) {
	return new Promise<GeolocationPosition>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, {
			maximumAge: fresh ? 0 : MS_HOUR,
			enableHighAccuracy: fresh,
			timeout: 30 * MS_SECOND,
		});
	});
}