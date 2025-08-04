import { isDefined } from "../type/isDefined";

export default function toString(input: unknown) {
	if (isDefined(input))
		return String(input);
}