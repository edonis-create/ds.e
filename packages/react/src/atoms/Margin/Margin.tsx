import React from "react";
import { Spacing } from "@ds.e/foundation";
import MarginSides from "./MarginSides";
interface MarginProps {
  space?: keyof typeof Spacing;
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
  top?: boolean;
}
const Margin: React.FunctionComponent<MarginProps> = (props) => {
  const { left, right, top, bottom, space = "md", children } = props;
  let className;
  if (!left && !right && !top && !bottom) {
    className = `dse-margin-${space}`;
  } else {
    for (const side in MarginSides) {
      if (MarginSides[side] === props[side]) {
        className = `${className ? className : ""} dse-margin-${side}-${space}`;
      }
    }
  }
  return <div className={className}>{children}</div>;
};

export default Margin;
