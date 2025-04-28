import { toDictionary3 } from "@coffee-break/toolbox/object/toDictionary";
import type { dictionary } from "@coffee-break/toolbox/type/dictionary";
import { identity } from "ramda";
import { factory_common } from "./factory_common";
import notificationPermissionApi from "./notifications";
import type { PermissionApi_read, PermissionApi_write } from "./PermissionApi";

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

	notifications: notificationPermissionApi,
} as const satisfies dictionary<PermissionApi_read | (PermissionApi_read & PermissionApi_write)>;



export default permissionsManager;