/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
export const addToCart = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    emptyCart(state, caction) {
      state.cart = [];
      state.total = 0;
    },
    addProducttocart: (state, action) => {
      state.cart.some((item) => item._id === action.payload._id) ? null : state.cart.push({ ...action.payload, qty: 0 });
    },
    deletProductformCart: (state, action) => {
      let index = state.cart.findIndex((obj) => obj._id === action.payload._id);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    deleteAll: (state, action) => {
      state.cart = [];
    },
    setProductQty: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.qty = action.payload.qty;
        }
      });
    },
    modifyProductPrice: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.price = action.payload.price;
          item.dumm_id = action.payload.dumm_id;
        }
      });
    },
    modifyProductPriceFreezone: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.freezonePrice = action.payload.price;
        }
      });
    },
    modifyProductPriceLocal: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.LocalPrice = action.payload.price;
        }
      });
    },
    modifyProductPriceFreezoneAED: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.freezonePriceAED = action.payload.price;
        }
      });
    },
    modifyProductPriceLocalAED: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.LocalPriceAED = action.payload.price;
        }
      });
    },
  },
});

export const {
  addProducttocart,
  deletProductformCart,
  deleteAll,
  setProductQty,
  modifyProductPrice,
  modifyProductPriceFreezone,
  modifyProductPriceLocal,
  modifyProductPriceFreezoneAED,
  modifyProductPriceLocalAED,
  emptyCart,
} = addToCart.actions;

export default addToCart.reducer;
