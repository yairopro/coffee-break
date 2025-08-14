import { toDictionary3 } from "@coffee-break/toolbox/object/toDictionary";
import { sql } from "drizzle-orm";
import { andThen, identity, nth, pipe } from "ramda";
import type { PlaceholderDic, ValuesDic } from "./types";

// TODO move all params into config object
export default function prepare<const K extends string[], Q extends Query>(name: string, keys: K, build: BuildQuery<K, Q>, config?: Config) {
	const placholders = toDictionary3(keys, identity, key => sql.placeholder(key)) as
		PlaceholderDic<K>;

	const listLimit = config?.limit ?? DEFAULT_LIMIT_LIST;
	const listQuery = build(placholders).limit(listLimit).prepare(name);

	type ListPromise = queryOutput<Q>;
	function loadList(params: ValuesDic<K>) {
		return listQuery.execute(params) as ListPromise;
	}

	const singleQuery = build(placholders).limit(1).prepare(name + '_single');
	type List = Awaited<ListPromise>;
	loadList.single = pipe(
		(params: ValuesDic<K>) => singleQuery.execute(params) as ListPromise,
		andThen(nth(0)<List>)
	);

	return loadList;
}

interface Config {
	limit?: number
}

export const DEFAULT_LIMIT_LIST = 100;

export type Query = { limit(limit: number): Preparable };
export type BuildQuery<K extends string[], Q extends Query> = (p: PlaceholderDic<K>) => Q;
export type queryOutput<Q extends Query> = ReturnType<ReturnType<ReturnType<Q["limit"]>['prepare']>['execute']>;

type Preparable = { prepare(name: string): Executable };
type Executable = { execute(params: any): Promise<any> };
