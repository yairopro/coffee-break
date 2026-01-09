export type dictionary<T = any, K extends Key = string> = {
	[k in K]+?: T;
};

export type Key = keyof any;