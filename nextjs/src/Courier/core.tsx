import assert from "@coffee-break/toolbox/test/assert";
import type { dictionary } from "@coffee-break/toolbox/type/dictionary";
import type { ZodType } from "zod";

export default function Courier<T>(name: string, schema?: ZodType<T>): Courier<T> {
	return {
		pack(data: T) {
			const serialized = JSON.stringify(data);
			return `globalThis["${COURIER_VAULT}"] ??= {}; globalThis["${COURIER_VAULT}"]["${name}"] = ${serialized};`
		},

		pickup() {
			const vault = requireVault();
			assert("relay-baton/core#getBaton()", name in vault, `No "${name}" has been set in the vault. You must set the generated script by the component RelatBatonScript or by injecting yourself`)

			const stored = vault[name];
			if (schema)
				return schema.parse(stored);

			return vault[name] as T;
		},
	};
}

export type Courier<T> = {
	pack(data: T): string;
	pickup(): T,
}


const COURIER_VAULT = "__COURIER_VAULT"
function requireVault() {
	const host: dictionary<unknown> = globalThis;
	const vault = host[COURIER_VAULT];
	assert("relay-baton/core#requireVault()", vault, "Global vault is not defined. You must set the generated script by the component RelatBatonScript or by injecting yourself");
	return vault as dictionary<unknown>;
}