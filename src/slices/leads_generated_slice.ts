import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { teamMembers } from "../data/team";
import { TeamMember } from "../types/team";

const receptoLeadsGenerated: number = teamMembers.reduce((acc, member) => acc + member.generated, 0);
const otherLeadsGenerated: number = teamMembers.reduce((acc, member) => acc + member.unlocked, 0);

interface LeadsGeneratedState {
  leadsGenerated: number;
}

const receptoLeadsInitialState: LeadsGeneratedState = {
  leadsGenerated: receptoLeadsGenerated,
};

const otherLeadsInitialState: LeadsGeneratedState = {
  leadsGenerated: otherLeadsGenerated,
};


interface MemberWiseLeadsGeneratedState {
  teamMembers: TeamMember[];
}

const memberWiseLeadsInitialState: MemberWiseLeadsGeneratedState = {
  teamMembers: teamMembers.map((member) => ({
    id: member.id,
    name: member.name,
    lastActive: member.lastActive,
    role: member.role,
    generated: member.generated || 0,
    assigned: member.assigned || 0,
    unlocked: member.unlocked || 0,
  })),
};

const receptoLeadsGeneratedSlice = createSlice({
  name: "leadsGenerated",
  initialState: receptoLeadsInitialState,
  reducers: {
    setReceptoLeadsGenerated: (state, action) => {
      state.leadsGenerated += action.payload;
    },
  },
});

const otherLeadsGeneratedSlice = createSlice({
  name: "leadsGenerated",
  initialState: otherLeadsInitialState,
  reducers: {
    setOtherLeadsGenerated: (state, action) => {
      state.leadsGenerated += action.payload;
    },
  },
});

const memberWiseLeadsGeneratedSlice = createSlice({
  name: "memberWiseLeadsGenerated",
  initialState: memberWiseLeadsInitialState,
  reducers: {
    updateUnlocked: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.teamMembers.forEach((member) => member.unlocked += 1);
      const member = state.teamMembers[id-1];
      member!.assigned += 1;
    },
    updateRole: (state, action: PayloadAction<{ id: number; role: string }>) => {
      const { id, role } = action.payload;
      state.teamMembers[id-1].role = role;
    }
  },
  
});


export const { updateUnlocked, updateRole } = memberWiseLeadsGeneratedSlice.actions;
export const memberWiseLeadsGeneratedReducer = memberWiseLeadsGeneratedSlice.reducer;
export const { setReceptoLeadsGenerated } = receptoLeadsGeneratedSlice.actions;
export const { setOtherLeadsGenerated } = otherLeadsGeneratedSlice.actions;
export const receptoLeadsGeneratedReducer = receptoLeadsGeneratedSlice.reducer;
export const otherLeadsGeneratedReducer = otherLeadsGeneratedSlice.reducer;