import { filter } from "ramda";

export const filterObj = filter as {
	<A, P extends A>(
		pred: (val: A) => val is P,
	): <B extends A>(dict: Record<string, B>) => Record<string, P>
	<T, P extends T>(pred: (val: T) => val is P, dict: Record<string, T>): Record<string, P>;
}