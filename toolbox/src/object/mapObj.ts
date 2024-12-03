import { map } from "ramda";

export const mapObj = map as {
	<A, B>(fn: (x: A) => B): <U extends Record<PropertyKey, A>>(dict: U) => Record<keyof U, B>;
	<U extends object, B>(fn: (x: ValueOfUnion<U>) => B, dict: U): Record<keyof U, B>
};