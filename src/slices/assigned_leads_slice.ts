import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AssignedLead } from "../types/assigned_leads";

const initialState: AssignedLead[] = [];

const assignedLeadsSlice = createSlice({
  name: "assignedLeads",
  initialState,
  reducers: {
    setAssignedLead: (state, action: PayloadAction<AssignedLead>) => {
      state.push(action.payload);
    },
  },
});

export const { setAssignedLead } = assignedLeadsSlice.actions;
export const assignedLeadsReducer = assignedLeadsSlice.reducer;