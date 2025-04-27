export type required<T extends {}, K extends keyof T = keyof T> = T & {
	[key in K]-?: T[key] & {}
};