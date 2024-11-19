import { ReactNode } from "react";

export type UseOpenModal = <T>(render: RenderModal<T>, options?: Partial<OpenModalOptions>) => ModalHandle<T>;
export type RenderModal<T> = (props: RenderModalProps<T>) => ReactNode;
export interface RenderModalProps<T> {
	close: CloseModal<T>;
}
export type CloseModal<T> = (input?: T) => void

export interface OpenModalOptions {
	backdrop: ReactNode;
}

export type Stack = ModalEntry<unknown>[];
export interface ModalEntry<T = unknown> {
	id: unknown,
	promise: PromiseLike<T | undefined>,
	close: CloseModal<T>,
	content: ReactNode,
}

export type ModalHandle<T> =
	/**
	 * ```
	 * const result = await openModal(...);
	 * ```
	 */
	& PromiseLike<T | undefined>
	/**
	 * ```
	 * const modal = await openModal(...);
	 * modal.close()
	 * ```
	 */
	& ModalEntry<T>;