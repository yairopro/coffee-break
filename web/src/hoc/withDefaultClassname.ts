import type { ClassValue } from "clsx";
import { createElement, type ComponentType } from "react";
import type { withCN } from "../type/withCN";
import { cn } from "../style/cn";

export default function withDefaultClassname<P extends { className: string }>(Component: ComponentType<P>, defaultClass: ClassValue) {
	const ComponentWithDefaultClassname = withEvolution({
		className(className: ClassValue) {
			return cn(defaultClass, className);
		}
	}, Component);

	ComponentWithDefaultClassname.displayName = Component.displayName + "_withDefaultClassname";
	return ComponentWithDefaultClassname;
}