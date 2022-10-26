import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Theme {
  id: number,
  label: string,
  alerts_count: number,
  created_at: Date
}

export type ThemeState = {
  themes: Theme[],
  selectedTheme: Theme | null,
}

const initialState: ThemeState = { themes: [], selectedTheme: null }

export const ThemeSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    addTheme(state, action: PayloadAction<Theme>) {
      state.themes.push(action.payload)
    },
    addThemes(state, action: PayloadAction<Theme[]>) {
      state.themes = action.payload
    },
    removeTheme(state, action: PayloadAction<Theme>) {
      state.themes = state.themes.filter((theme) => theme.id !== action.payload.id)
    },
    selectTheme(state, action: PayloadAction<Theme>) {
      state.selectedTheme = action.payload;
    },
    updateTheme(state, action: PayloadAction<Theme>) {
      state.selectedTheme = null;
      state.themes.forEach((theme) => {
        if(theme.id === action.payload.id) {
          theme = { ...action.payload }
        }
      })
    }
  }
})

export const { addTheme, addThemes, removeTheme, selectTheme, updateTheme } = ThemeSlice.actions;
export const getThemes = ({ theme }: { theme: ThemeState }): Theme[] => theme.themes;
export const getSelectedTheme = ({ theme}: { theme: ThemeState } ): Theme | null => theme.selectedTheme;
export default ThemeSlice.reducer;