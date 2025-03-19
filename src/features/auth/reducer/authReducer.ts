import { User } from "@auth0/auth0-react";
import { StateCreator } from "zustand";

export interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  user: User | null;
  setUser: (user: User | undefined | null) => void;
}

export const authReducer: StateCreator<AuthState> = (set): AuthState => ({
  token: null,
  setToken: (token: string) => set({ token: token }),
  user: null,
  setUser: (user: User | undefined | null) => set({ user: user }),
});
