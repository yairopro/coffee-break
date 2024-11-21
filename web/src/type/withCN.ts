import type { merge } from "@yair-behar/js-tools/type/merge";
import type { ClassValue } from "clsx";

export type withCN<props extends {}> = merge<[props, { className: ClassValue }]>