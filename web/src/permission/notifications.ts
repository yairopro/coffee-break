import { __, prop } from "ramda";
import factory_require from "./factory_require";

const mapNotificationPermissionState = prop<Record<NotificationPermission, PermissionState>>(__, {
	default: "prompt",
	denied: "denied",
	granted: "granted",
});

export const requireNotifications = factory_require({
	name: "notifications",
	ask: () => Notification.requestPermission().then(mapNotificationPermissionState),
});

