"use client";

/**
 * Just runs a hook.
 */
export default function HookFx({ use }: HookFxProps) {
	use();
	return null;
}

export interface HookFxProps {
	use: () => unknown;
}