export default function createTimeout(fn: () => void, delay: number) {
	const key = setTimeout(fn, delay);
	return () => clearTimeout(key);
}