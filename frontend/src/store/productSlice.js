import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addProductToCheckedList: (state, action) => {
      const item = action.payload;
      const existItem = state.products.find((x) => x._id === item._id);
      if (!existItem) {
        state.products.push(action.payload);
      } else {
        console.log("product already exists");
      }
    },
    removeProductFromCheckedList: (state, action) => {
      const filtered = state.products.filter((item) => item._id !== action.payload._id);
      state.products = filtered;
    },
    setProductQty: (state, action) => {
      state.products.map((item) => {
        if (action.payload.id === item._id) {
          item.qty = action.payload.qty;
        }
      });
    },
  },
});

export const { addProductToCheckedList, removeProductFromCheckedList, setProductQty } = productSlice.actions;

export default productSlice.reducer;
