import { is } from "ramda";

export default function assert(mustBeTruthy: unknown, errorParam: unknown) {
	if (!mustBeTruthy) {
		const error = is(String, errorParam) ? new Error(errorParam) : errorParam;
		throw error;
	}
}