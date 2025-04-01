import { inc } from "ramda";
import { useReducer } from "react";

export default function useRerender() {
	return useReducer(inc, 0)[1];
}