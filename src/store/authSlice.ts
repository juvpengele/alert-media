import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string | null,
  email: string | null,
  access_token: string | null
}

export type AuthState = {
  auth: User | null
}

const storedAuth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') as string) as User: null;
const INITIAL_STATE: AuthState = {
  auth: storedAuth
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.auth = action.payload;
    },
    logout(state) {
      state.auth = null;
    }
  }
})

export const { login, logout } = AuthSlice.actions;
export const authSelector = ({ auth }: { auth: AuthState }): User | null => auth.auth;
export default AuthSlice.reducer;