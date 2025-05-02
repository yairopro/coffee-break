export interface InputProps<T> {
	value?: T,
	onValueChange?(value: T): void,
	defaultValue?: T,
}