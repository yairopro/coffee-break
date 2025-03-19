export function factory_common(name: PermissionName) {
	return {
		onChange(callback: (_: PermissionStatus) => void) {
			let unsubscribed = false;
			let remove: (() => void) | undefined;
			const unsubscribe = () => {
				unsubscribed = true;
				remove?.();
			};

			navigator.permissions.query({ name })
				.then(status => {
					let listener = () => callback(status);
					if (!unsubscribed) {
						status.addEventListener("change", listener);
						remove = () => status.removeEventListener("change", listener);
					}
				})


			return unsubscribe;
		}
	}
}