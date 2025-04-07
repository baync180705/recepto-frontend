import { createSlice } from "@reduxjs/toolkit";

interface CreditState {
  credit: number;
}

const initialState: CreditState = {
  credit: 100,
};
const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    setCredit: (state, action) => {
      state.credit = action.payload;
    }
  }
});
export const { setCredit } = creditSlice.actions;
export default creditSlice.reducer;
