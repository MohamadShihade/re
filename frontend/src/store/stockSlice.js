import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
export const stockSlice = createSlice({
  name: "stock",
  initialState: initialState,
  reducers: {
    updateProductStockState: (state, action) => {
      state.products.map((product) => {
        if (product._id === action.payload.id) {
          product[action.payload.newStock.property] = action.payload.newStock.value;
        }
      });
    },
    updateStockState: (state, action) => {
      console.log(action.payload);
      state.products.map((product) => {
        if (product._id === action.payload.id) {
          product.bl = action.payload.data;
        }
      });
    },
    deleteProductState: (state, action) => {
      state.products = state.products.filter((item) => {
        return item._id !== action.payload;
      });
    },

    fetchAll: (state, action) => {
      console.log(action.payload);
      const data = action.payload;
      state.products = data;
    },
  },
});

export const { fetchAll } = stockSlice.actions;

export default stockSlice.reducer;
