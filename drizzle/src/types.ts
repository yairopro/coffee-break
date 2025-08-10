import type { Placeholder } from "drizzle-orm";

export type PlaceholderValue = string | number | Date | boolean;
export type PlaceholderDic<K extends string[]> = { [k in K[number]]: Placeholder };
export type ValuesDic<K extends string[]> = { [k in K[number]]: PlaceholderValue };