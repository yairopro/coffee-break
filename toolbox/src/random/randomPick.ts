export function randomPick<T>(array: T[]): T | undefined {
	const { length } = array;
	if (!length) return;

	const index = Math.trunc(Math.random() * length) % length;
	return array[index];
}