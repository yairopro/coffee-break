import type { required } from "./required";

/**
 * Mark fields as optionnal exept certain keys.
 * ```
 *  @see atMost
 */
export type atLeast<target extends object, fields extends keyof target = never> = Omit<Partial<target>, fields> &
	required<Pick<target, fields>>;