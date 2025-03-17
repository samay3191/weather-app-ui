import { apiRequest } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { ActionStatus } from "@/types/enums";
import { WeatherData, WeatherStation } from "@/types/types";

export interface FilterState {
  status: ActionStatus;
  stations: WeatherStation[];
  states: string[];
  currentState: string[] | undefined;
  selectedStationId: string | null;
  selectedStationWeatherData: WeatherData[] | null;
  setStations: (data: WeatherStation[]) => void;
  setCurrentState: (state: string[]) => void;
  fetchStations: () => Promise<void>;
  fetchWeatherData: (id: number) => Promise<void>;
}

export const filterReducer = (set): FilterState => ({
  status: ActionStatus.IDLE,
  stations: [],
  states: [],
  currentState: undefined,
  selectedStationId: null,
  selectedStationWeatherData: [],
  setStations: (data: WeatherStation[]) => set({ stations: data }),
  setCurrentState: (state: string[]) => set({ currentState: state }),
  fetchStations: async () => {
    set({ status: ActionStatus.LOADING });
    const fetchStationPromise = apiRequest("/weatherStations", "GET").then(
      (res) => {
        const uniqueStates = [...new Set(res.map((item: WeatherStation) => item.state))];
        set({ status: ActionStatus.SUCCESSFUL, stations: res, states: uniqueStates });
      }
    );
    toaster.promise(fetchStationPromise, {
      success: { title: "Done!", description: "Weather stations are fetched!" },
      error: {
        title: "Something went wrong!",
        description: "Please try again!",
      },
      loading: {
        title: "Fetching all stations...",
        description: "Please wait",
      },
    });
  },
  fetchWeatherData: async (id: number) => {
    set({ status: ActionStatus.LOADING });
    const fetchWeatherDataPromise = apiRequest(`/weatherData/latest/weather-station/${id}`, "GET").then(
      (res) => {
        set({ status: ActionStatus.SUCCESSFUL, selectedStationWeatherData: res });
      }
    );
    toaster.promise(fetchWeatherDataPromise, {
      success: { title: "Done!", description: "Weather data is fetched!" },
      error: {
        title: "Something went wrong!",
        description: "Please try again!",
      },
      loading: {
        title: "Fetching weather data...",
        description: "Please wait",
      },
    });
  },
});
