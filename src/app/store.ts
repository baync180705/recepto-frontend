import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user_slice';
import creditReducer from '../slices/credit_slice';
import locationFilterReducer from '../slices/filter_slice';
import { receptoScoreReducer, otherScoreReducer } from '../slices/score_slice';
import { receptoLeadsGeneratedReducer, otherLeadsGeneratedReducer } from '../slices/leads_generated_slice';
import { setUnlockedCardsReducer } from '../slices/unlocked_leads_slice';
import {memberWiseLeadsGeneratedReducer} from '../slices/leads_generated_slice';
import  {assignedLeadsReducer } from '../slices/assigned_leads_slice';
import { likesReducer } from '../slices/likes_score_slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    credit: creditReducer,
    locationFilter: locationFilterReducer,
    receptoScore: receptoScoreReducer,
    otherScore: otherScoreReducer,
    receptoLeads: receptoLeadsGeneratedReducer,
    otherLeads: otherLeadsGeneratedReducer,
    unlockedCards: setUnlockedCardsReducer,
    memberWiseLeads: memberWiseLeadsGeneratedReducer,
    assignedLeads: assignedLeadsReducer,
    likes: likesReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;