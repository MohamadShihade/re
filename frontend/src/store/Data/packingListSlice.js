import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packingLists: [],
};
export const packingListsSlice = createSlice({
  name: "packingLists",
  initialState: initialState,
  reducers: {
    fetchAll: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.packingLists = data;
    },
    // changePackingListStatus: (state, action) => {
    //   console.log(action.payload);
    //   state.packingLists.map((item) => {
    //     if (item._id === action.payload.id) {
    //       item.status = action.payload.status;
    //       item.managerMessage = action.payload.managerMessage;
    //       item.manager = action.payload.manager;
    //     }
    //   });
    // },
    deletePackingListState: (state, action) => {
      state.packingLists = state.packingLists.filter((item) => {
        return item._id !== action.payload;
      });
    },
    changePackingListStatus: (state, action) => {
      console.log(action.payload);
      state.packingLists.map((pkl) => {
        if (pkl._id === action.payload.id) {
          if (action.payload.managerApproval) {
            pkl.managerApproval = action.payload.managerApproval;
          }

          if (action.payload.managerMessage) {
            pkl.managerMessage = action.payload.managerMessage;
          }

          if (action.payload.manager) {
            pkl.manager = action.payload.manager;
          }
          //  proformaInvoice.status = action.payload.status;
          // proformaInvoice.managerMessage = action.payload.managerMessage;
          //  proformaInvoice.manager = action.payload.manager;
        }
      });
    },
  },
});

export const { fetchAll, changePackingListStatus, deletePackingListState } = packingListsSlice.actions;

export default packingListsSlice.reducer;
