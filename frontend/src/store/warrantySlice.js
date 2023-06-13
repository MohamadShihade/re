import { createSlice } from "@reduxjs/toolkit";

export const warrantySlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addProductToWarrantyList: (state, action) => {
      state.products.push(action.payload);
    },
    removeProductFromWarrantyList: (state, action) => {
      const filtered = state.products.filter((item) => item._id !== action.payload._id);
      state.products = filtered;
    },
    setProductQty: (state, action) => {
      state.products.map((item) => {
        if (action.payload.id === item._id) {
          item.qty = action.payload.qty;
          state.total += action.payload.qty * 34;
        }
      });
    },
  },
});

export const { addProductToWarrantyList, removeProductFromWarrantyList, setProductQty } = warrantySlice.actions;

export default warrantySlice.reducer;
