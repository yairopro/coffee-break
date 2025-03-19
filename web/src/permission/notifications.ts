import { __, andThen, pipe, prop } from "ramda";
import factory_require from "./factory_require";
import voidParams from "@coffee-break/toolbox/function/voidParams"

const mapNotificationPermissionState = prop<Record<NotificationPermission, PermissionState>>(__, {
	default: "prompt",
	denied: "denied",
	granted: "granted",
});

export const requireNotifications = factory_require({
	name: "notifications",
	read: () => mapNotificationPermissionState(Notification.permission),
	ask: pipe(voidParams(Notification.requestPermission), andThen(mapNotificationPermissionState)),
});

