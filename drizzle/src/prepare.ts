import { toDictionary3 } from "@coffee-break/toolbox/object/toDictionary";
import type { fn } from "@coffee-break/toolbox/type/fn";
import { sql } from "drizzle-orm";
import { identity } from "ramda";
import type { PlaceholderDic, ValuesDic } from "./types";

export default function prepare<const K extends string[], Q extends Query>(name: string, keys: K, build: BuildQuery<K, Q>) {
	const placholders = toDictionary3(keys, identity, key => sql.placeholder(key)) as
		PlaceholderDic<K>;

	const query = build(placholders).prepare(name);
	return function execute(params: ValuesDic<K>) {
		return query.execute(params) as queryOutput<Q>;
	};
}


type Query = { prepare: fn<[string], { execute: fn<[any], Promise<any>> }> };
type BuildQuery<K extends string[], Q extends Query> = (p: PlaceholderDic<K>) => Q;
type queryOutput<Q extends Query> = ReturnType<ReturnType<Q['prepare']>['execute']>;