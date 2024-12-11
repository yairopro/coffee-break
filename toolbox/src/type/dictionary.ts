export type dictionary<T = any, K extends Key = Key> = {
	[k in K]+?: T;
};

export type Key = keyof any;