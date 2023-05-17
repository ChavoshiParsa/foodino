import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
  idCounter: 0,
  isCartShown: false,
  isLoading: false,
};

export const popAsync = createAsyncThunk(
  "uiSlice/popAsync",
  async (time, { dispatch }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(uiActions.popAlert());
        resolve();
      }, time);
    });
  }
);

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    putNewAlert(state, action) {
      state.alerts.push({
        status: action.payload.status,
        message: action.payload.message,
        id: "a" + state.idCounter,
      });
      state.idCounter++;
    },
    removeAlert(state, action) {
      const id = action.payload;
      state.alerts = state.alerts.filter((item) => item.id !== id);
    },
    popAlert(state) {
      state.alerts.shift();
    },
    showCart(state) {
      state.isCartShown = true;
    },
    hideCart(state) {
      state.isCartShown = false;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
