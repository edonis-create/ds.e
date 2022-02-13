import React from "react";
import { withA11y } from "@storybook/addon-a11y";
import Select from "../molecules/Select";

import "@ds.e/scss/lib/Select.css";

export default {
  title: "Molecules/Select",
  decorators: [withA11y],
};
const options = [
  {
    label: "Strict Black",
    value: "strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "sweet-pink",
  },
];

export const Common = () => <Select options={options} />;

export const RenderOption = () => (
  <Select
    options={options}
    renderOption={({ option, getOptionRecommendedProps, isSelected }) => (
      <span {...getOptionRecommendedProps()}>
        {option.label}
        {isSelected ? "Selected" : ""}
      </span>
    )}
  />
);

export const CustomLabel = () => (
  <Select label="Select a color" options={options} />
);
