import React from "react";
import { FontSizes } from "@ds.e/foundation";
interface TextProps {
    size?: keyof typeof FontSizes;
}
declare const Text: React.FC<TextProps>;
export default Text;
