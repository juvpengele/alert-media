import { ThemeSlice } from './themeSlice';
import { ZoneSlice } from './zonesSlice';
import { SectorSlice } from './sectorsSlice';
import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "./authMiddleware";
import { AuthSlice } from "./authSlice";
const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    sector: SectorSlice.reducer,
    zone: ZoneSlice.reducer,
    theme: ThemeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
});

export type RootState = ReturnType<typeof store.getState>
export default store;