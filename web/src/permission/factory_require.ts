export default function factory_require({ name, ask }: factory_requireParam) {
	return async function require() {
		const permission = await ask();
		if (permission != "granted")
			throw new Error(name + " permision denied");
	}
}

type factory_requireParam = {
	name: string,
	ask(): Promise<PermissionState>,
};