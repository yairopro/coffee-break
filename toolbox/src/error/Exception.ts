/**
 * Exceptions are expected errors in the use-flow.
 * The code field should be used to identify the exception.
 */
export default class Exception extends Error {
	constructor(public code: string, message: string, options?: ErrorOptions) {
		super(message, options);
	}

	toJSON() {
		return {
			code: this.code,
			message: this.message,
			cause: this.cause,
			stack: this.stack,
		};
	}
}
