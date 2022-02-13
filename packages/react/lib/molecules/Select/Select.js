import React, { useState, useRef, useEffect } from 'react';
import '@ds.e/foundation';
import Text from '../../atoms/Text/Text.js';

const KEY_CODES = {
    ENTER: "Enter",
    SPACE: "32",
    DOWN_ARROW: "ArrowDown",
    UP_ARROW: "ArrowUp",
    ESC: "Escape",
};
const Select = ({ options = [], label = "Please select an Option", onOptionSelected: handler, renderOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [highlitedIndex, setHighlightedIndex] = useState(null);
    const [optionsRef, setOptionsRef] = useState([]);
    const [overlayTop, setOverlayTop] = useState(null);
    const labelRef = useRef(null);
    const onOptionSelected = (option, optionIndex) => {
        setIsOpen(!isOpen);
        handler && handler(option, optionIndex);
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    const getPreviousOptionIndex = (currentIndex, options) => {
        if (currentIndex === 0) {
            return options.length - 1;
        }
        if (currentIndex === null) {
            return 0;
        }
        return currentIndex - 1;
    };
    const getNextOptionIndex = (currentIndex, options) => {
        if (currentIndex === null) {
            return 0;
        }
        if (currentIndex === options.length - 1) {
            return 0;
        }
        return currentIndex + 1;
    };
    const highlightOption = (optionIndex) => {
        setHighlightedIndex(optionIndex);
    };
    const onButtonKeyDown = (event) => {
        if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.code)) {
            setIsOpen(true);
            highlightOption(0);
        }
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    let selectedOption;
    if (selectedIndex !== null) {
        selectedOption = options[selectedIndex];
    }
    const onOptionKeyDown = (event) => {
        if (event.key === KEY_CODES.ESC) {
            setIsOpen(false);
            return;
        }
        if (event.key === KEY_CODES.DOWN_ARROW) {
            highlightOption(getNextOptionIndex(highlitedIndex, options));
        }
        if (event.key === KEY_CODES.UP_ARROW) {
            highlightOption(getPreviousOptionIndex(highlitedIndex, options));
        }
        if (event.key === KEY_CODES.ENTER) {
            console.log("CALLED");
            onOptionSelected(options[highlitedIndex], highlitedIndex);
        }
    };
    useEffect(() => {
        setOptionsRef(options.map((_) => React.createRef()));
    }, [options.length]);
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    useEffect(() => {
        if (highlitedIndex !== null && isOpen) {
            const ref = optionsRef[highlitedIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [isOpen, highlitedIndex]);
    return (React.createElement("div", { className: "dse-select" },
        React.createElement("button", { "data-testid": "DseSelectButton", onKeyDown: onButtonKeyDown, "aria-controls": "dse-select-list", "aria-expanded": isOpen ? true : undefined, "aria-haspopup": true, ref: labelRef, className: "dse-select__label", onClick: () => onLabelClick() },
            React.createElement(Text, null, selectedOption ? selectedOption.label : label),
            React.createElement("svg", { width: "1rem", height: "1rem", className: `w-6 h-6 dse-select__caret ${isOpen ? "dse-select__caret--open" : "dse-select__caret--close"}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }))),
        React.createElement("ul", { role: "menu", id: "dse-select-list", className: `dse-select__overlay ${isOpen ? "dse-select__overlay--open" : ""}`, style: { top: `${overlayTop}px` } }, options.map((option, optionIndex) => {
            const ref = optionsRef[optionIndex];
            const isSelected = selectedIndex === optionIndex;
            const isHighlighted = highlitedIndex === optionIndex;
            const renderOptionProps = {
                option,
                isSelected,
                "aria-label": option.label,
                "aria-checked": isSelected ? true : undefined,
                getOptionRecommendedProps: (overrideProps) => {
                    return {
                        role: "menuitemradio",
                        className: `dse-select__option ${isSelected ? "dse-select__option--selected" : ""} ${isHighlighted ? "dse-select__option--highlighted" : ""}
                  `,
                        tabIndex: -1,
                        onKeyDown: onOptionKeyDown,
                        onMouseEnter: () => highlightOption(optionIndex),
                        onMouseLeave: () => highlightOption(null),
                        ref,
                        onClick: () => onOptionSelected(option, optionIndex),
                        key: option.value,
                        ...overrideProps,
                    };
                },
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return (React.createElement("li", { ...renderOptionProps.getOptionRecommendedProps() },
                React.createElement(Text, null, option.label),
                isSelected && (React.createElement("svg", { width: "1rem", height: "1rem", className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })))));
        }))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
