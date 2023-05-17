import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  info: { email: null, password: null, userUID: null },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    loggingIn(state, action) {
      state.isLoggedIn = true;
      state.info = action.payload;
    },
    loggingOut(state) {
      state.isLoggedIn = false;
      state.info = { email: null, password: null, userUID: null };
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice;
