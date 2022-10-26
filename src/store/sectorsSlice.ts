import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

export interface Sector {
  id: number,
  label: string,
  alerts_count: number,
  created_at: Date
}

export type SectorState = {
  sectors: Sector[],
  selectedSector: Sector | null,
}

const initialState: SectorState = { sectors: [], selectedSector: null }

export const SectorSlice = createSlice({
  name: 'sectors',
  initialState,
  reducers: {
    addSector(state, action: PayloadAction<Sector>) {
      state.sectors.push(action.payload)
    },
    addSectors(state, action: PayloadAction<Sector[]>) {
      state.sectors = action.payload
    },
    removeSector(state, action: PayloadAction<Sector>) {
      state.sectors = state.sectors.filter((sector) => sector.id !== action.payload.id)
    },
    selectSector(state, action: PayloadAction<Sector>) {
      state.selectedSector = action.payload;
    },
    updateSector(state, action: PayloadAction<Sector>) {
      state.selectedSector = null;
      state.sectors.forEach((sector) => {
        if(sector.id === action.payload.id) {
          sector = { ...action.payload }
        }
      })
    }
  }
})

export const { addSector, addSectors, removeSector, selectSector, updateSector } = SectorSlice.actions;
export const getSectors = ({ sector }: { sector: SectorState }): Sector[] => sector.sectors;
export const getSelectedSector = ({ sector }: { sector: SectorState } ): Sector | null => sector.selectedSector;
export default SectorSlice.reducer;