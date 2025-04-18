export function randomPick<T>(array: readonly T[]): T | undefined {
	const { length } = array;
	if (!length) return;

	const index = Math.trunc(Math.random() * length) % length;
	return array[index];
}