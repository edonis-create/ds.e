import React from "react";
import { Spacing } from "@ds.e/foundation";
interface MarginProps {
    space?: keyof typeof Spacing;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    top?: boolean;
}
declare const Margin: React.FunctionComponent<MarginProps>;
export default Margin;
