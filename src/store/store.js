import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";
import accountSlice from "./account-slice";
import foodDataSlice from "./food-data";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    account: accountSlice.reducer,
    foodData: foodDataSlice.reducer,
  },
});

export default store;
