/**
 * Mark fields as optionnal exept certain keys.
 * ```
 *  @see atMost
 */
export type atLeast<target extends object, fields extends keyof target = never> = Partial<target> &
	Pick<target, fields>;
