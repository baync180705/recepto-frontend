import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  selectedLocations: string[];
  minScore: number;
}

const initialState: FilterState = {
  selectedLocations: [],
  minScore: 0,
};

const filterSlice = createSlice({
  name: 'locationFilter',
  initialState,
  reducers: {
    setSelectedLocations(state, action: PayloadAction<string[]>) {
      state.selectedLocations = action.payload;
    },
    setMinimumScore(state, action: PayloadAction<number>) {
      state.minScore = action.payload;
    },
  },
});

export const { setSelectedLocations, setMinimumScore } = filterSlice.actions;
export default filterSlice.reducer;