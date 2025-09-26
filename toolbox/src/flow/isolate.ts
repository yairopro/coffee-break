export default function isolate<const P extends () => any>(process: P, recover: (reason: unknown) => unknown = console.warn): ReturnType<P> | undefined {
	try {
		return process();
	} catch (caught: unknown) {
		try {
			recover(caught);
		}
		catch (error: unknown) {
			console.error(`isolate(${process.name}) is unable to recover: \n 1. ${caught} \n 2. ${error}`);
		}
	}
}