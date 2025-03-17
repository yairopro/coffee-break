import willTryCatch from "@coffee-break/toolbox/error/willTryCatch";
import { isNil, mapObjIndexed, pipe } from "ramda";
import SuperJSON from "superjson";
import { z, ZodType } from "zod";

/**
 * Create a interface to write & read a specific schema.
 * On write: serialize the data using superjson.
 * On read: parse the stored string, and validate the ouput with the schema.
 * If the stored value is invalid, the value will be undefined.
 * ```
 * const authStorage = specificStorage({auth: Auth});
 * authStorage.write({ auth })
 * const {auth} = authStorage.read();
 * ```
 * @param dic The dictionary of schemas for each key.
 */
export function specificStorage<const D extends Record<string, ZodType>>(dic: D) {
	type Values = output<D>;
	return {
		read() {
			return read(dic) as Values;
		},
		write(values: Partial<Values>) {
			write(values);
		}
	}
}

function read<const D extends input>(dic: D) {
	return mapObjIndexed((type, key) => {
		const storedText = localStorage.getItem(key);
		if (isNil(storedText)) return;

		const serialized = parse(storedText);
		return type.safeParse(serialized).data;
	}, dic) as unknown;
}
const parse = willTryCatch(pipe(JSON.parse, SuperJSON.parse));

function write(dic: Record<string, unknown>) {
	Object.entries(dic)
		.forEach(([key, value]) => {
			if (isNil(value))
				localStorage.removeItem(key);
			else {
				const serialized = serialize(value);
				localStorage.setItem(key, serialized);
			}
		});
}
const serialize = pipe(SuperJSON.serialize, JSON.stringify);


type input = Record<string, ZodType>;
type output<D extends input> = {
	[key in keyof D]: z.infer<D[key]> | undefined
};