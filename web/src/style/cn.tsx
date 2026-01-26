import clsx from "clsx";
import { pipe } from "ramda";
import { twMerge } from "tailwind-merge";

export const cn = pipe(clsx, twMerge);

