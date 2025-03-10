import type { Key } from "./dictionary";
import type { merge } from "./merge";

/**
 * Mark certain keys as optional.
 * ```
 * @see atLeast
 */
export type atMost<target extends object, fields extends Key> = merge<
	[
		target,
		{
			[key in fields]+?: key extends keyof target ? target[key] : never;
		},
	]
>;
