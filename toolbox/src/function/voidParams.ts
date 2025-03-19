export default function voidParams<T>(fn: (...p: any[]) => T) {
	return () => fn();
}