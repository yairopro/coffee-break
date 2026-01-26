import { __, prop } from "ramda";
import factory_require from "./factory_require";
import type { PermissionApi_read, PermissionApi_write } from "./PermissionApi";
import { factory_common } from "./factory_common";

const mapNotificationPermissionState = prop<Record<NotificationPermission, PermissionState>>(__, {
	default: "prompt",
	denied: "denied",
	granted: "granted",
});

export const requireNotifications = factory_require({
	name: "notifications",
	ask: () => Notification.requestPermission().then(mapNotificationPermissionState),
});


const notificationPermissionApi: PermissionApi_read & PermissionApi_write = {
	...factory_common("notifications"),
	async getState() {
		return mapNotificationPermissionState(Notification.permission);
	},
	require: requireNotifications,
};
export default notificationPermissionApi;