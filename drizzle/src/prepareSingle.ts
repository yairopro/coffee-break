import { toDictionary3 } from "@coffee-break/toolbox/object/toDictionary";
import { andThen, identity, nth, pipe } from "ramda";
import type { PlaceholderDic, ValuesDic } from "./types";
import { sql } from "drizzle-orm";

export default function prepareSingle<const K extends string[], const Q extends Query>(name: string, keys: K, build: BuildQuery<K, Q>) {
	const placholders = toDictionary3(keys, identity, key => sql.placeholder(key)) as
		PlaceholderDic<K>;

	const query = build(placholders).limit(1).prepare(name);
	type PromiseOutput = queryOutput<Q>;
	type Output = Awaited<PromiseOutput>;

	return pipe(
		(params: ValuesDic<K>) => query.execute(params) as PromiseOutput,
		andThen(nth(0)<Output>)
	);
}

export type Query = { limit(limit: number): { prepare(name: string): { execute(params: any): Promise<any> } } };
export type BuildQuery<K extends string[], Q extends Query> = (p: PlaceholderDic<K>) => Q;
export type queryOutput<Q extends Query> = ReturnType<ReturnType<ReturnType<Q["limit"]>['prepare']>['execute']>;