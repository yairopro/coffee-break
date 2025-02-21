import willTryCatch from "@coffee-break/toolbox/error/willTryCatch";
import { isNil, pipe, zipObj } from "ramda";
import SuperJSON from "superjson";
import type { ZodType } from "zod";

const webStorage = {
	read<const O extends object>(keys: (keyof O & string)[], zod?: ZodType<O>, strict?: boolean) {
		const items = keys.map(key => {
			const itemStr = localStorage.getItem(key as string);

			if (itemStr) {
				const parsed = willTryCatch(serializer.parse)(itemStr) ?? itemStr;
				if (!zod) return parsed;

				const validation = zod?.safeParse(parsed);
				if (validation.success)
					return validation.data;
				if (strict)
					throw validation.error;
			};
		});

		// @ts-expect-error
		return zipObj(keys, items) as Partial<O>;
	},

	/**
	 * ```
	 * webStorage.write({
	 * 	key: "value",
	 * 	keyObj: {a: 1, b: [2]},
	 * 	keyToDelete: null,
	 * })
	 * ```
	 */
	async write(dic: Record<string, unknown>) {
		Object.entries(dic)
			.forEach(([key, value]) => {
				if (isNil(value))
					localStorage.removeItem(key);
				else {
					const serialized = serializer.serialize(value);
					localStorage.setItem(key, serialized);
				}
			});
	},
}


export default webStorage;

const serializer = function serializer() {
	const serialize = pipe(SuperJSON.serialize, JSON.stringify);
	const parse = pipe(JSON.parse, SuperJSON.parse);

	return {
		parse,
		serialize,
	};
}()