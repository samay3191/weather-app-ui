import { render, screen } from "@testing-library/react";
import MarkerContent from "../components/MarkerContent";
import { WeatherData } from "@/types/types";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

describe("MarkerContent Component", () => {
  const mockSite = "Window Farm";
  const mockMeasurementData: WeatherData[] = [
    {
      id: 136,
      weather_station_id: 7,
      variable_id: 71,
      value: 2.237,
      timestamp: "2023-08-29 03:00:00",
      name: "WS_avg",
      long_name: "Wind Speed Avg.",
      unit: "m/s",
    },
    {
      id: 137,
      weather_station_id: 7,
      variable_id: 72,
      value: 295.5,
      timestamp: "2023-08-29 03:00:00",
      name: "WD_avg",
      long_name: "Wind Dir. Avg.",
      unit: "Deg",
    },
  ];

  const renderWithProviders = (ui: React.ReactElement) =>
    render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>);

  test("renders site name correctly", () => {
    renderWithProviders(
      <MarkerContent site={mockSite} measurementData={mockMeasurementData} />
    );

    expect(screen.getByText(mockSite)).toBeInTheDocument();
  });

  test("displays all measurement data", () => {
    renderWithProviders(
      <MarkerContent site={mockSite} measurementData={mockMeasurementData} />
    );

    expect(screen.getByText("Wind Speed Avg.")).toBeInTheDocument();
    expect(screen.getByText("2.237")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("m/s"))).toBeInTheDocument();


    expect(screen.getByText("Wind Dir. Avg.")).toBeInTheDocument();
    expect(screen.getByText("295.5")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Deg"))).toBeInTheDocument();
  });

  test("renders last fetched timestamp", () => {
    renderWithProviders(
      <MarkerContent site={mockSite} measurementData={mockMeasurementData} />
    );

    expect(screen.getByText("Last Fetched on")).toBeInTheDocument();
    expect(screen.getByText("2023-08-29 03:00:00")).toBeInTheDocument();
  });

  test("renders correctly with empty measurementData", () => {
    renderWithProviders(<MarkerContent site={mockSite} measurementData={[]} />);

    expect(screen.getByText(mockSite)).toBeInTheDocument();
    expect(screen.queryByText("Last Fetched on")).not.toBeInTheDocument(); // Should not display timestamp
  });
});
