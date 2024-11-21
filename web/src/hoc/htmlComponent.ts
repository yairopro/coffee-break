import type { merge } from "@yair-behar/js-tools/type/merge";
import type { ClassValue } from "clsx";
import { createElement, type ComponentProps, } from "react";
import { cn } from "../style/cn";
import firstUpCase from "@yair-behar/js-tools/text/firstUpCase";
import type { withCN } from "../type/withCN";

/**
 * ```
 * Wrap a dom component, and allow className to be a class-value (array/object).
 * ```
 */
export default function htmlComponent<T extends Tag>(tag: T) {
	function HtmlComponent(props: withCN<ComponentProps<T>>) {
		return createElement(tag, {
			...props,
			className: cn(props.className),
		});
	}

	HtmlComponent.displayName = firstUpCase(tag);
	return HtmlComponent;
}

export type Tag = keyof JSX.IntrinsicElements;

