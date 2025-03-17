import { apiRequest } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { ActionStatus } from "@/types/enums";
import { WeatherData, WeatherStation } from "@/types/types";

export interface MapState {
  mapStatus: ActionStatus;
  currentMarker: google.maps.marker.AdvancedMarkerElement | null;
  setCurrentMarker: (
    marker: google.maps.marker.AdvancedMarkerElement | null
  ) => void;
  selectedStationWeatherData: WeatherData[] | null;
  fetchWeatherData: (id: number) => Promise<void>;
  showInfoWindow: boolean;
  setShowInfoWindow: (show: boolean) => void;
  selectedStation: WeatherStation | null;
  setSelectedStation: (station: WeatherStation) => void;
}

export const mapReducer = (set): MapState => ({
  mapStatus: ActionStatus.IDLE,
  currentMarker: null,
  setCurrentMarker: (marker: google.maps.marker.AdvancedMarkerElement | null) =>
    set({ currentMarker: marker }),
  showInfoWindow: false,
  setShowInfoWindow: (show: boolean) => set({ showInfoWindow: show }),
  selectedStation: null,
  setSelectedStation: (station: WeatherStation) => set({ selectedStation: station }),
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
