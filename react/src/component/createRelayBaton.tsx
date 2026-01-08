import React from "react";

export default function createRelayBaton<T>(name: string) {
	function genScript(data: T) {
		const serialized = JSON.stringify(data);
		return `globalThis["${GLOBAL_KEY}"] ??= {}; globalThis["${GLOBAL_KEY}"]["${name}"] = ${serialized};`
	}

	function Baton({ data }: ClientDataProps<T>) {
		return <script>{genScript(data)}</script>
	}
	Baton.genScript = genScript;

	function getBaton() {
		// @ts-expect-error
		return globalThis[GLOBAL_KEY]?.[name] as T | undefined;
	}

	return [Baton, getBaton] as const;
}

export interface ClientDataProps<T> {
	data: T,
}

const GLOBAL_KEY = "_relay_baton"