export default function isolate<const F extends process>(
	process: F,
	recover: Recover<F> = console.warn): Output<F> {
	try {
		return process();
	} catch (caught: unknown) {
		try {
			return recover(caught) as Output<F>;
		}
		catch (error: unknown) {
			console.error(`isolate(${process.name}) is unable to recover: \n 1. ${caught} \n 2. ${error}`);
		}
	}
}

type process = () => any;
type Output<F extends process> = ReturnType<F> | undefined
type Recover<F extends process> = (caught: unknown) => Output<F> | void;