import { is } from "ramda";

export default function assert(who: string, mustBeTruthy: unknown, errorParam: unknown): asserts mustBeTruthy is {} {
	if (!mustBeTruthy) {
		const error = is(String, errorParam) ? new Error(errorParam)
			: errorParam instanceof Error ? errorParam
				: new Error(String(errorParam));

		try {
			error.message = `${who}:> ${error.message}`;
		}
		catch {
			console.error(`${who}:> ${error.message}`);
		}

		throw error;
	}
}