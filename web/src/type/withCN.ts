import type { merge } from "@coffee-break/toolbox/type/merge";
import type { ClassValue } from "clsx";

export type withCN<props extends {}> = merge<[props, { className: ClassValue }]>