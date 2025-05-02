import { useReducer, useRef, useState } from "react";
import type { InputProps } from "../type/InputProps";
import willTryCatch from "@coffee-break/toolbox/error/willTryCatch";
import useRerender from "./useRerender";
import type { fn } from "@coffee-break/toolbox/type/fn";
import { complement, equals, find } from "ramda";



/**
 * State for child inputs.
 */
export default function useInputState<const P extends Readonly<InputProps<any>>>({
	value: controledValue,
	onValueChange,
	defaultValue,
	...props
}: P) {
	type T = P extends InputProps<infer T> ? T : never;

	const state = useRef<T>(defaultValue);
	state.current = firstNotUndefined([controledValue, state.current]);

	const rerender = useRerender();
	function setState(update: T | fn<[T], T>) {
		const oldValue = state.current;
		state.current = update instanceof Function ? update(state.current)
			: update;

		if (oldValue !== state.current) {
			if (onValueChange) willTryCatch(onValueChange)(state.current);
			rerender();
		}
	}

	return [state.current, setState, props] as const;
}


// ---
const firstNotUndefined = find(complement(equals(undefined))) as <T>(l: T[]) => T | undefined;
