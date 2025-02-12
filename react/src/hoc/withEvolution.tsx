import type { ComponentType } from "react";
import { evolve as rEvolve } from "ramda";
import type { AnyFn, fn } from "@coffee-break/toolbox/type/fn";
import React from "react";


/**
 * Apply an evolution to the props before rendering the component.
 * @see https://ramdajs.com/docs/#evolve from ramda
 *
 * ```
 * // Make a badge that accepts integer numbers only.
 * const NumberInput = withEvolution(TextInput, {
 *  value: String,
 * 	onValueChange: callback => callback && pipe(Number, callback),
 * });
 * ```
 */
export function withEvolution<TargetProps extends object, TE extends TargetEvolution<TargetProps> = TargetEvolution<TargetProps>>(
	evolution: TargetEvolution<TargetProps>,
	Component: ComponentType<TargetProps>,
) {
	type NewProps = devolveTarget<TE, TargetProps>;

	return function EvolvedComponent(props: NewProps) {
		const innerProps = evolve(props, evolution) as TargetProps;
		return <Component  {...innerProps} />;
	};
}





const evolve = rEvolve as nEvolve; // TODO use ramda types
type nEvolve = <T extends object, E extends SourceEvolution<T>>(source: T, evolution: E) => T & evolveSource<T, E>

type SourceEvolution<Source extends object> = {
	[key in keyof Source]+?: fn<[Source[key], key, Source], any>;
};

type evolveSource<T extends object, E extends SourceEvolution<T>> = {
	[key in keyof T]: E[key] extends AnyFn ? ReturnType<E[key]> : T[key];
};

type TargetEvolution<Target extends object> = {
	[key in keyof Target]+?: fn<[any, key, object], Target[key]>;
};

type devolveTarget<TE extends TargetEvolution<Target>, Target extends object> = {
	[key in keyof Target]: TE[key] extends AnyFn ? Parameters<TE[key]>[0] : Target[key];
};
