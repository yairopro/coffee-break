export interface PermissionApi_read {
	getState(): Promise<PermissionStatus["state"]>,
	onChange(listener: (_: PermissionStatus) => void): () => void;
}

export interface PermissionApi_write {
	require(): Promise<void>;
}