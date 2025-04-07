import { createSlice } from "@reduxjs/toolkit";
import { Lead } from "../types/leads";
import { leads } from "../data/leads";


const initialState: Lead[] = leads;
const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state, action) => {
        const { id, likes } = action.payload;
        state[id].score += likes; 
    }
  }
});
export const { setLikes } = likesSlice.actions;
export const likesReducer = likesSlice.reducer;
