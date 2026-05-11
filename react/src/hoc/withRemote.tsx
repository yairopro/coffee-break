"use client";

import { evolve, last, remove, update } from "ramda";
import type { ComponentProps, ComponentType } from "react";
import React, { useEffect, useState } from "react";
import { create } from 'zustand';

export default function withRemote<const C extends ComponentType<any>>(Component: C) {
	type RemoteProps = ComponentProps<C> extends withRemoteProps<infer P> ? NonNullable<P> : {};
	type ExternalProps = Omit<ComponentProps<C>, "remoteProps">;

	type Entry = [id: string, RemoteProps];
	type State = { stack: Entry[] }
	const useStore = create<State>(() => ({ stack: [] }));

	function set(entry: Entry) {
		useStore.setState(
			evolve({
				stack(stack: Entry[]) {
					const [id, props] = entry;
					const idx = stack.findIndex(([eId]) => id == eId);
					if (idx >= 0) {
						if (props)
							return update(idx, entry, stack);
						return remove(idx, 1, stack);
					}

					if (props)
						return [...stack, entry];

					return stack;
				}
			})
		);
	}


	function WithRemote({ ...props }: ExternalProps) {
		const remoteProps = useStore(({stack}) => last(stack)?.[1]);
		// @ts-expect-error
		return <Component {...props} remoteProps={remoteProps} />
	}

	function Remote(props: RemoteProps) {
		// TODO
		const [id] = useState(() => crypto.randomUUID());
		useEffect(() => set([id, props]), [props]);
		return null;
	}

	return [WithRemote, Remote] as const;
}

export interface withRemoteProps<P> {
	remoteProps: P | undefined,
}