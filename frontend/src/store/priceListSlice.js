import { createSlice } from "@reduxjs/toolkit";

export const priceListSlice = createSlice({
  name: "product",
  initialState: {
    chosenProducts: [],
    // currentPage: 1,
    // numberOfPages: 1,
  },
  reducers: {
    addToPriceList: (state, action) => {
      const item = action.payload;
      const existItem = state.chosenProducts.find((x) => x._id === item._id);
      if (!existItem) {
        state.chosenProducts.push(action.payload);
      } else {
        console.log("product already exists");
      }
    },
    removeFromPriceList: (state, action) => {
      const filtered = state.chosenProducts.filter((item) => item._id !== action.payload._id);
      state.chosenProducts = filtered;
    },
  },
});

export const { addToPriceList, removeFromPriceList } = priceListSlice.actions;

export default priceListSlice.reducer;
