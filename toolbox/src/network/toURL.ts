export default function toURL(url: string, base?: string) {
	try { return new URL(url, base) } catch { /* do nothing */ };
}