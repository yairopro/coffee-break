"use client";

import { Provider, ReactNode, useCallback, useState } from "react";
import { OpenModalContext } from "./open-modal-context";
import { ModalEntry, RenderModal, Stack, UseOpenModal } from "./types";
import makePromise from "@yair-behar/js-tools/promise/makePromise"
import append from "ramda/es/append"
import React from "react";

const Provider = OpenModalContext.Provider;
export default function ReactOpenModalContainer({ children }: ReactOpenModalContainerProps) {
	const [stack, setStack] = useState<Stack>([]);
	const openModal: UseOpenModal = useCallback(<T,>(render: RenderModal<T>) => {
		const [promise, close] = makePromise<T | undefined>();
		const content = render({ close });
		const entry: ModalEntry<T> = {
			id: ++ID,
			close,
			promise,
			content,
		};

		setStack(append<ModalEntry<any>>(entry));

		return Object.assign(promise, entry);
	}, []);

	return (
		<Provider value={openModal}>
			{children}

			{
				stack.map()
			}
		</Provider>
	)
}

export interface ReactOpenModalContainerProps {
	children: ReactNode
}


let ID = 0;
