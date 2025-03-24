import type { ClassValue } from "clsx";
import { type ComponentType } from "react";
import { cn } from "../style/cn";
import { withEvolution } from "@coffee-break/react/hoc/withEvolution";

export default function withDefaultClassname<P extends { className: string }>(defaultClass: ClassValue, Component: ComponentType<P>) {
	return withEvolution<P>(
		// @ts-expect-error I don't know why
		{
			className(className: ClassValue): string {
				return cn(defaultClass, className);
			}
		},
		Component
	);
}