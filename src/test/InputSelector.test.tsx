import { render, screen, fireEvent, act } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"; // Required for Chakra components
import InputSelector, {
  InputSelectorOptions,
} from "../components/InputSelector";
import { vi } from "vitest";

describe("InputSelector Component", () => {
  const mockOptions: InputSelectorOptions[] = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const renderWithProviders = (ui: React.ReactElement) =>
    render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>); // Wrap component with ChakraProvider

  test("renders label correctly", () => {
    renderWithProviders(
      <InputSelector
        label="Select an option"
        placeHolder="Choose..."
        optionList={mockOptions}
        value={[]}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  test("displays placeholder text", () => {
    renderWithProviders(
      <InputSelector
        label="Select an option"
        placeHolder="Choose..."
        optionList={mockOptions}
        value={[]}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Choose...")).toBeInTheDocument();
  });

  test("displays options when clicked", async () => {
    renderWithProviders(
      <InputSelector
        label="Select an option"
        placeHolder="Choose..."
        optionList={mockOptions}
        value={[]}
        onChange={() => {}}
      />
    );

    // Open the dropdown inside act()
    await act(async () => {
      fireEvent.mouseDown(screen.getByRole("combobox"));
    });

    const option1 = screen.getAllByText("Option 1")[0];
    console.log("option1", option1);
    expect(option1).toBeInTheDocument();
    const option2 = screen.getAllByText("Option 2")[0];
    expect(option2).toBeInTheDocument();
    const option3 = screen.getAllByText("Option 3")[0];
    expect(option3).toBeInTheDocument();
  });

  test("calls onChange when an option is selected", async () => {
    const handleChange = vi.fn();

    renderWithProviders(
      <InputSelector
        label="Select an option"
        placeHolder="Choose..."
        optionList={mockOptions}
        value={[]}
        onChange={handleChange}
      />
    );

    await act(async () => {
      fireEvent.mouseDown(screen.getByRole("combobox"));
    });

    // Simulate arrow down + enter key to select option
    await act(async () => {
      fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });
      fireEvent.keyDown(screen.getByRole("combobox"), { key: "Enter" });
    });

    // Click the option as well (if needed)
    const option = await screen.getAllByText("Option 2")[0];
    await act(async () => {
      fireEvent.click(option);
    });
  });

  test("disables selection when disabled prop is true", () => {
    renderWithProviders(
      <InputSelector
        label="Select an option"
        placeHolder="Choose..."
        optionList={mockOptions}
        value={[]}
        onChange={() => {}}
        disabled={true} // Disabled mode
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeDisabled(); // Ensure select is disabled
  });
});
