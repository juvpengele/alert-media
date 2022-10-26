import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Zone {
  id: number,
  label: string,
  alerts_count: number,
  created_at: Date
}

export type ZoneState = {
  zones: Zone[],
  selectedZone: Zone | null,
}

const initialState: ZoneState = { zones: [], selectedZone: null }

export const ZoneSlice = createSlice({
  name: 'zones',
  initialState,
  reducers: {
    addZone(state, action: PayloadAction<Zone>) {
      state.zones.push(action.payload)
    },
    addZones(state, action: PayloadAction<Zone[]>) {
      state.zones = action.payload
    },
    removeZone(state, action: PayloadAction<Zone>) {
      state.zones = state.zones.filter((zone) => zone.id !== action.payload.id)
    },
    selectZone(state, action: PayloadAction<Zone>) {
      state.selectedZone = action.payload;
    },
    updateZone(state, action: PayloadAction<Zone>) {
      state.selectedZone = null;
      state.zones.forEach((zone) => {
        if(zone.id === action.payload.id) {
          zone = { ...action.payload }
        }
      })
    }
  }
})

export const { addZone, addZones, removeZone, selectZone, updateZone } = ZoneSlice.actions;
export const getZones = ({ zone }: { zone: ZoneState }): Zone[] => zone.zones;
export const getSelectedZone = ({ zone}: { zone: ZoneState } ): Zone | null => zone.selectedZone;
export default ZoneSlice.reducer;