import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  isAnythingBought: false,
  totalAmount: 0,
  totalPrice: 0,
  items: [],
  changed: false,
};

/*
  id: "i0",
  name: "Grilled Lamb",
  price: 32,
  amount: "1",
*/

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    replaceCart(state, action) {
      state.name = action.payload.name;
      state.isAnythingBought = action.payload.isAnythingBought;
      state.totalAmount = action.payload.totalAmount;
      state.totalPrice = action.payload.totalPrice;
      state.items = action.payload.items;
    },
    addCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalAmount++;
      state.isAnythingBought = true;
      state.totalPrice += newItem.price;

      if (!existingItem) {
        state.items.push({ ...newItem, ...{ amount: 1 } });
      } else {
        existingItem.amount++;
      }

      state.changed = true;
    },
    remove(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalAmount--;
      state.totalPrice -= newItem.price;

      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== newItem.id);
      } else {
        existingItem.amount--;
      }

      if (state.totalAmount === 0) {
        state.isAnythingBought = false;
      }

      state.changed = true;
    },
    removeAll(state) {
      state.items = [];
      state.isAnythingBought = false;
      state.totalAmount = 0;
      state.totalPrice = 0;

      state.changed = true;
    },
    clearEveryThing(state) {
      state.name = null;
      state.isAnythingBought = false;
      state.totalAmount = 0;
      state.totalPrice = 0;
      state.items = [];
      state.changed = false;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
