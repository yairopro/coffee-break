import { identity } from "ramda";
import type { Key } from "../type/dictionary";
import type { fn } from "../type/fn";

export function toDictionary1<const A extends readonly Key[]>(array: A) {
	return toDictionary3(array, String, identity) as primitivesToDictionary<A>;
}

export function toDictionary2<T, K extends Key>(
	array: readonly T[],
	keyExtractor: fn<[T, number, readonly T[]], K>,
) {
	return toDictionary3(array, keyExtractor, identity) as Record<K, T>;
}


/**
 * Convert an array into an dictionary.
 * @param keyExtractor The function to extract the key for a given item.
 * ```
 * const students = [{name: "Harry"}, {name: "Ron"}, {name: "Hermione"}];
 * const studentsDic = toDictionary(students, student => student.name);
 * // {
 * // 	Harry: {name: "Harry"},
 * // 	Ron: {name: "Ron"},
 * // 	Hermione: {name: "Hermione"},
 * // }
 * ```
 */
export function toDictionary3<T, K extends Key, O = T>(
	values: readonly T[],
	keyExtractor: fn<[T, number, readonly T[]], K>,
	valueConverter: fn<[T, number, readonly T[]], O>,
) {
	return values.reduce((dic, item, index, array) => {
		const key = keyExtractor(item, index, array);
		dic[key] = valueConverter(item, index, array);
		return dic;
	}, {} as Record<K, O>);
}

// Convert a tuple of primitives into a dictionary.
type primitivesToDictionary<A extends readonly Key[], Dic extends object = {}> = A extends readonly [
	infer E,
	...infer rest,
]
	? rest extends readonly Key[]
	? primitivesToDictionary<rest, Dic & (E extends Key ? { [key in E]: E } : {})>
	: Dic
	: Dic;
