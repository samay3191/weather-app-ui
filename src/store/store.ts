import {
  filterReducer,
  FilterState,
} from "@/features/filter/reducer/filterReducer";
import { create } from "zustand";

// Combine the reducers
export const useStore = create<FilterState>((set) => ({
  ...filterReducer(set),
}));
