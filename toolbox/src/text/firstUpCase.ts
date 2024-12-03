/**
 * ```
 * firstUpCase("hi") // "Hi"
 * ```
 */
export default function firstUpCase(text: string) {
	const first = text[0]?.toUpperCase() ?? "";
	return first + text.slice(1);
}