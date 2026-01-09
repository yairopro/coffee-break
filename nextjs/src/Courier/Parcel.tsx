import React from "react";
import type { Courier } from "./core";

export default function Parcel<T>({ courier, data }: ShipParcelToWindowProps<T>) {
	return <script>{courier.pack(data)}</script>;
}

export interface ShipParcelToWindowProps<T> {
	courier: Courier<T>
	data: T,
}
