import {
  filterReducer,
  FilterState,
} from "@/features/filter/reducer/filterReducer";
import {
  mapReducer,
  MapState,
} from "@/features/mapContainer/reducer/mapReducer";
import { create } from "zustand";

// Combine the reducers
export const useStore = create<FilterState & MapState>((set) => ({
  ...filterReducer(set),
  ...mapReducer(set),
}));
