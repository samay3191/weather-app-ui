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
export const useStore = create<FilterState & MapState & AuthState>((set, get, store) => ({
  ...authReducer(set, get, store),
  ...filterReducer(set, get, store),
  ...mapReducer(set, get, store),
}));
