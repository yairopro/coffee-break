export default function createInterval(fn: () => void, interval: number) {
	const key = setInterval(fn, interval);
	return () => clearInterval(key);
}