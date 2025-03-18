import type { dictionary } from "@coffee-break/toolbox/type/dictionary";
import type { ComponentProps, ComponentPropsWithRef, ComponentType, PropsWithoutRef } from "react";
import { createElement, forwardRef } from "react";


export function withStaticProps<
	C extends ComponentType<any>,
	P extends Partial<ComponentProps<C>> & dictionary,
>(staticProps: P, Component: C) {
	type OldProps = ComponentPropsWithRef<C>;
	type NewProps = PropsWithoutRef<Omit<OldProps, keyof P>>;

	return forwardRef((originalProps: NewProps, ref: OldProps["ref"]) => {
		return createElement(Component, { ref, ...originalProps, ...staticProps });
	});
}
