import React from 'react';
import marginSides from './MarginSides.js';

const Margin = (props) => {
    const { left, right, top, bottom, space = "md", children } = props;
    let className;
    if (!left && !right && !top && !bottom) {
        className = `dse-margin-${space}`;
    }
    else {
        for (const side in marginSides) {
            if (marginSides[side] === props[side]) {
                className = `${className ? className : ""} dse-margin-${side}-${space}`;
            }
        }
    }
    return React.createElement("div", { className: className }, children);
};

export { Margin as default };
//# sourceMappingURL=Margin.js.map
