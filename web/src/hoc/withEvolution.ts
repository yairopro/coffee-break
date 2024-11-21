import type { ComponentType } from "react";
import type { evolve, Evolved } from "ramda";



/**
 */
export function withEvolution<>(
	Component: ComponentType<TargetProps> | string,
	evolution: TE,
) {
	type NewProps = devolveTarget<TE, TargetProps>;

	return function EvolvedComponent(props: NewProps) {
		const innerProps = evolve(props, evolution) as TargetProps;
		return <Component { ...innerProps } />;
	};
}
