import { toDictionary3 } from "@coffee-break/toolbox/object/toDictionary";
import { identity } from "ramda";
import { requireNotifications } from "./notifications";
import { factory_common } from "./factory_common";

const PERMISSION_NAMES = [
	"camera",
	"geolocation",
	"microphone",
	"midi",
	"notifications",
	"persistent-storage",
	"push",
	"screen-wake-lock",
	"storage-access"
] as const satisfies PermissionName[];

const common = toDictionary3(PERMISSION_NAMES, identity, factory_common);



const permissionsManager = {
	...common,

	notifications: {
		...common.notifications,
		require: requireNotifications
	},
}



export default permissionsManager;