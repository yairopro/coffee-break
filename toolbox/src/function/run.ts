export default function run<T>(fn: () => T){
	return fn();
}