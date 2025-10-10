import React from "react";

export default function createRelayBaton<T>(name: string) {
	function Baton({ data }: ClientDataProps<T>) {
		const serialized = JSON.stringify(data);
		return <script>{`window.${GLOBAL_KEY} ??= {}; window["${GLOBAL_KEY}"]["${name}"] = ${serialized};`}</script>
	}

	function getBaton() {
		// @ts-expect-error
		return window[GLOBAL_KEY]?.[name] as T | undefined;
	}

	return [Baton, getBaton] as const;
}

export interface ClientDataProps<T> {
	data: T,
}

const GLOBAL_KEY = "_relay_baton"