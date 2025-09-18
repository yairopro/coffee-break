export default function isolate(process: () => unknown, recover: (reason: unknown) => unknown = console.warn) {
	try {
		process();
	} catch (caught: unknown) {
		try {
			recover(caught);
		}
		catch (error: unknown) {
			console.error(`isolate(${process.name}) is unable to recover: \n 1. ${caught} \n 2. ${error}`);
		}
	}
}