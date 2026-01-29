import assert from "@coffee-break/toolbox/test/assert";
import type { ZodType } from "zod";
import { isWindow } from "../sides";

export default function Courier<T>(name: string, schema?: ZodType<T>) {
	let pickedData: T | undefined;
	return {
		pack: {
			meta(data: T) {
				return { [`${COURIER_VAULT}.${name}`]: JSON.stringify(data) };
			},

			script(data: T) {
				const serialized = JSON.stringify(data);
				return `globalThis["${COURIER_VAULT}"] ??= {}; globalThis["${COURIER_VAULT}"]["${name}"] = ${serialized};`
			},
		},

		pickup() {
			if (!pickedData) {
				const found = pickFromVault() ?? pickFromHeaders();
				pickedData = schema?.parse(found) ?? (found as T);
			}
			assert("Courier.pickup()", pickedData, `No "${name}" has been set in the vault/header. You must inject Courrier.pack or script in the DOM`);
			return pickedData;
		},
	};


	function pickFromVault(): unknown {
		// @ts-expect-error
		return globalThis[COURIER_VAULT]?.[name];
	}
	function pickFromHeaders(): unknown {
		if (isWindow) {
			const meta = globalThis?.document.querySelector(`meta[name="${COURIER_VAULT}.${name}"]`);
			const content = meta?.getAttribute("content");
			if (content)
				return JSON.parse(content);
		}
	}
}


const COURIER_VAULT = "COURIER_VAULT"