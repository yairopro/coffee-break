export default async function requireNotificationPermission() {
	if (Notification.permission === "granted") return;
	if (Notification.permission === "denied") throw new Error("Notification permision was denied");

	const permission = await Notification.requestPermission();
	if (permission != "granted")
		throw new Error("Notification permision denied");
}