import type { ComponentProps } from "react";
import htmlComponent from "../hoc/htmlComponent";

const Div = htmlComponent("div");

export default Div;
export type DivProps = ComponentProps<typeof Div>;