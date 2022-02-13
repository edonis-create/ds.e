import React from "react";
import Select from "./Select";

import { render, fireEvent } from "@testing-library/react";

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
test("renders all options passed to it", () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);
  fireEvent.click(getByTestId("DseSelectButton"));
  expect(getAllByRole("menuitemradio")).toHaveLength(options.length);
});

test("renders options using custom renderOption method if passed as a prop", () => {
  const { getAllByRole, getAllByTestId, getByTestId } = render(
    <Select
      options={options}
      renderOption={({ option, getOptionRecommendedProps }) => {
        return (
          <li {...getOptionRecommendedProps()} data-testid="CustomRenderOption">
            {option.label}
          </li>
        );
      }}
    />
  );
  fireEvent.click(getByTestId("DseSelectButton"));
  expect(getAllByTestId("CustomRenderOption")).toHaveLength(options.length);
});

test("calls the onOptionSelected prop with the selected option and its index if passed", () => {
  const onOptionSelected = jest.fn();
  const { getAllByRole, getByTestId } = render(
    <Select options={options} onOptionSelected={onOptionSelected} />
  );
  fireEvent.click(getByTestId("DseSelectButton"));
  fireEvent.click(getAllByRole("menuitemradio")[0]);

  expect(onOptionSelected).toHaveBeenCalledWith(options[0], 0);
});

test("the button label changes to the selected option label", () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);
  fireEvent.click(getByTestId("DseSelectButton"));
  fireEvent.click(getAllByRole("menuitemradio")[0]);

  expect(getByTestId("DseSelectButton")).toHaveTextContent(options[0].label);
});

test("snapshot of selected option state", () => {
  const { getAllByRole, getByTestId, asFragment } = render(
    <Select options={options} />
  );
  fireEvent.click(getByTestId("DseSelectButton"));
  fireEvent.click(getAllByRole("menuitemradio")[0]);
  expect(asFragment()).toMatchSnapshot();
});

test("snapshot of the base state", () => {
  const { asFragment } = render(<Select options={options} />);

  expect(asFragment()).toMatchSnapshot();
});

test("snapshot of menu open state", () => {
  const { getByTestId, asFragment } = render(<Select options={options} />);
  fireEvent.click(getByTestId("DseSelectButton"));
  expect(asFragment()).toMatchSnapshot();
});

test("can customize select label", () => {
  const { getByTestId, getByText } = render(
    <Select options={options} label="text" />
  );
  expect(getByText(/text/)).toBeInTheDocument;
});
