import z from "zod";

export const JSObject = z.looseObject({});
export const JSONObject = z.string()
	.pipe(z.preprocess((input, ctx) => {
		try {
			return JSON.parse(input);
		} catch (error) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `JSON parsing failed: ${error}`,
			});
			return z.NEVER;
		}
	}, JSObject));
