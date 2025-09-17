export default class CodedError extends Error {
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
