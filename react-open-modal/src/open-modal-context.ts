import { createContext } from "react";
import { type UseOpenModal } from "./types";

export const OpenModalContext = createContext<UseOpenModal | null>(null);


