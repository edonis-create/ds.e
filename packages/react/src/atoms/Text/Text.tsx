import React from "react";
import { FontSizes } from "@ds.e/foundation";

interface TextProps {
  size?: keyof typeof FontSizes;
}

const Text: React.FC<TextProps> = ({ size = "base", children }) => {
  const className = `dse-text dse-font-${size}`;
  return <p className={className}>{children}</p>;
};

export default Text;
