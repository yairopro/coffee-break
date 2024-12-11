import { complement, isNil } from "ramda";

export const isDefined = complement(isNil) as (input: unknown) => input is {};