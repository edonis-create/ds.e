import React from "react";
import { text, select } from "@storybook/addon-knobs";
import Color from "../atoms/Color";
import "@ds.e/scss/lib/Utilities.css";
import { Spacing } from "@ds.e/foundation";
export default {
  title: "Atoms/Color",
};

export const Common = () => <Color hexCode={text("HexCode", "pink")} />;

export const CutsomDimensions = () => (
  <Color
    hexCode={text("HexCode", "pink")}
    width={select("Width", Object.values(Spacing), "sm")}
    height={select("Height", Object.values(Spacing), "sm")}
  />
);
