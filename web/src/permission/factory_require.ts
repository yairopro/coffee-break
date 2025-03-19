export default function factory_require({ name, read, ask }: factory_requireParam) {
	return async function require() {
		const state = await read();
		if (state === "granted") return;
		if (state === "denied") throw new Error(name + " permision was denied");

		const permission = await ask();
		if (permission != "granted")
			throw new Error(name + " permision denied");
	}
}

type factory_requireParam = {
	name: string,
	read(): PermissionState | Promise<PermissionState>,
	ask(): Promise<PermissionState>,
};