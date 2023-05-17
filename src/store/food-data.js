import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const foodDataSlice = createSlice({
  name: "foodData",
  initialState,
  reducers: {
    setFoodData(state, action) {
      state.items = action.payload;
    },
  },
});

export const foodDataAction = foodDataSlice.actions;

export default foodDataSlice;
