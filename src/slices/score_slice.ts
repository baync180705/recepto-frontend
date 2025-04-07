import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { leads } from "../data/leads";


const receptoNetInitialState = leads.reduce((sum, lead) => {
    if (lead.source === "ReceptoNet") {
      return sum + lead.score;
    }
    return sum;
  }, 0);
  
  const otherNetInitialSocre = leads.reduce((sum, lead) => { 
    if (lead.source !== "ReceptoNet") {
      return sum + lead.score;
    }
    return sum;
  }, 0);

interface ScoreState {
    score: number;
}
const receptoInitialState: ScoreState = {
    score: receptoNetInitialState,
};

const otherInitialState: ScoreState = {
    score: otherNetInitialSocre,
};

const receptoScoreSlice  = createSlice({
    name: 'receptoScore',
    initialState: receptoInitialState,
    reducers: {
        setReceptoScore: (state, action: PayloadAction<number>) => {
            state.score = state.score + action.payload;
        }
    }
})

const otherScoreSlice  = createSlice({
    name: 'otherScore',
    initialState: otherInitialState,
    reducers: {
        setOtherScore: (state, action: PayloadAction<number>) => {
            state.score = state.score + action.payload;
        }
    }
})
export const receptoScoreReducer = receptoScoreSlice.reducer;
export const otherScoreReducer = otherScoreSlice.reducer;
export const { setReceptoScore: setReceptoScore } = receptoScoreSlice.actions;
export const { setOtherScore: setOtherScore } = otherScoreSlice.actions;