import React, { type ComponentType } from "react";
import type { ClassValue } from "clsx";
import { cn } from "../style/cn"

export default function withDefaultClassName<const C extends ComponentType<any>>(className: ClassValue, Component: C) {
	return function Wrapper_WithDefaultClassName(props: any) {
		return <Component {...props} className={cn([className, props.className])} />
	} as C;
}