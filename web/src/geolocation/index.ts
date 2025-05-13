import { geolocationContainer } from "./container";
import getGeolocation from "./getGeolocation";
import watchGeolocation from "./watchGeolocation";

const geolocation = Object.assign(geolocationContainer, {
	get: getGeolocation,
	watch: watchGeolocation,
});

export default geolocation as typeof geolocation
	// listen() won't provide undefined
	& { listen(callback: (position: GeolocationPosition) => unknown): void; };