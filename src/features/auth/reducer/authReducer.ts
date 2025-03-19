export interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
}

export const authReducer = (set): AuthState => ({
  token: null,
  setToken: (token: string) => set({ token: token }),
});
