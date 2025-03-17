import { apiRequest } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { ActionStatus } from "@/types/enums";
import { WeatherData } from "@/types/types";
import { MarkerRef } from "@vis.gl/react-google-maps";

export interface MapState {
  mapStatus: ActionStatus;
  currentMarker: MarkerRef | undefined;
  setCurrentMarker: (marker: MarkerRef) => void;
  selectedStationWeatherData: WeatherData[] | null;
  fetchWeatherData: (id: number) => Promise<void>;
}

export const mapReducer = (set): MapState => ({
  mapStatus: ActionStatus.IDLE,
  currentMarker: undefined,
  setCurrentMarker: (marker: MarkerRef) => set({ currentMarker: marker }),
  selectedStationWeatherData: [],
  fetchWeatherData: async (id: number) => {
    set({ mapStatus: ActionStatus.LOADING });
    const fetchWeatherDataPromise = apiRequest(
      `/weatherData/latest/weather-station/${id}`,
      "GET"
    )
      .then((res) => {
        set({
          mapStatus: ActionStatus.SUCCESSFUL,
          selectedStationWeatherData: res,
        });
      })
      .catch((err) => {
        console.log("Error : ", err);
        set({
          mapStatus: ActionStatus.FAILED,
          selectedStationWeatherData: [],
        });
      });
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
