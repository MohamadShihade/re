import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchaseOrders: [],
};
export const purchaseOrdersSlice = createSlice({
  name: "purchaseOrders",
  initialState: initialState,
  reducers: {
    fetchAll: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.purchaseOrders = data;
    },
    changePurchaseOrderStatus: (state, action) => {
      console.log(action.payload);
      state.purchaseOrders.map((item) => {
        if (item._id === action.payload.id) {
          item.status = action.payload.status;
          item.managerMessage = action.payload.managerMessage;
          item.manager = action.payload.manager;
        }
      });
    },
    deletePurchaseOrderState: (state, action) => {
      state.purchaseOrders = state.purchaseOrders.filter((item) => {
        return item._id !== action.payload;
      });
    },
  },
});

export const { fetchAll, changePurchaseOrderStatus, deletePurchaseOrderState } = purchaseOrdersSlice.actions;

export default purchaseOrdersSlice.reducer;
