import Hub from "@coffee-break/toolbox/struct/Hub";
import type { fn } from "@coffee-break/toolbox/type/fn";

export default function subscribeToNotificationPermission(listener: fn<[NotificationPermission]>) {
	return notificationPermissionHub.plug(listener);
}

export const notificationPermissionHub = Hub<NotificationPermission>();