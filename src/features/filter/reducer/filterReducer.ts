import { apiRequest } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { ActionStatus } from "@/types/enums";
import { WeatherStation } from "@/types/types";
import { StateCreator } from "zustand";

export interface FilterState {
  status: ActionStatus;
  stations: WeatherStation[];
  setStations: (data: WeatherStation[]) => void;
  states: string[];
  currentState: string[] | undefined;
  setCurrentState: (state: string[]) => void;
  currentStation: string[] | undefined;
  setCurrentStation: (state: string[]) => void;
  clearFilters: () => void;
  fetchStations: () => Promise<void>;
}

export const filterReducer: StateCreator<FilterState> = (set, get): FilterState => ({
  status: ActionStatus.IDLE,
  stations: [],
  setStations: (data: WeatherStation[]) => set({ stations: data }),
  states: [],
  currentState: undefined,
  setCurrentState: (state: string[]) => set({ currentState: state, currentStation: [] }),
  currentStation: undefined,
  setCurrentStation: (station: string[]) => set({ currentStation: station }),
  clearFilters: () => set({ currentState: undefined, currentStation: undefined }),
  fetchStations: async () => {
    set({ status: ActionStatus.LOADING });
    const token = get().token;
    const fetchStationPromise = apiRequest("/weatherStations", "GET", token).then(
      (res) => {
        const uniqueStates = [
          ...new Set(res.map((item: WeatherStation) => item.state)),
        ];
        set({
          status: ActionStatus.SUCCESSFUL,
          stations: res,
          states: uniqueStates,
        });
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
});
