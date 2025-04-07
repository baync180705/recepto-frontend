import { createSlice } from "@reduxjs/toolkit";

interface UnlockedCardsState {
  unlockedCardsId:  number[];
}

const initialState: UnlockedCardsState = {
  unlockedCardsId: [],
};

const unlockedCardsSlice = createSlice({
  name: "unlockedCards",
  initialState,
  reducers: {
    setUnlockedCardsId: (state, action) => {
      state.unlockedCardsId.push(action.payload);
    },
  },
}); 

export const { setUnlockedCardsId } = unlockedCardsSlice.actions;
export const setUnlockedCardsReducer = unlockedCardsSlice.reducer;