import { authReducer, AuthState } from "@/features/auth/reducer/authReducer";
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
export const useStore = create<FilterState & MapState & AuthState>((set, get) => ({
  ...authReducer(set),
  ...filterReducer(set, get),
  ...mapReducer(set, get),
}));
