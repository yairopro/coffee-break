export type required<T extends {}> = {
	[key in keyof T]: T[key] & {}
};