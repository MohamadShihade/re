import { createSlice } from "@reduxjs/toolkit";
import { orderStatus } from "../config/piOrderStatus";

const initialState = {
  proformaInvoices: [],
};
export const proformaInvoicesSlice = createSlice({
  name: "proformaInvoices",
  initialState: initialState,
  reducers: {
    deleteProformaInvoiceState: (state, action) => {
      state.proformaInvoices = state.proformaInvoices.filter((item) => {
        return item._id !== action.payload;
      });
    },
    fetchAllProformaInvoices: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.proformaInvoices = data;
    },
    changeProformaInvoiceStatus: (state, action) => {
      console.log(action.payload);
      state.proformaInvoices.map((proformaInvoice) => {
        if (proformaInvoice._id === action.payload.id) {
          if (action.payload.financiaApproval) {
            proformaInvoice.financiaApproval = action.payload.financiaApproval;
          }
          if (action.payload.managerApproval) {
            proformaInvoice.managerApproval = action.payload.managerApproval;
          }
          if (action.payload.managerMessage) {
            proformaInvoice.managerMessage = action.payload.managerMessage;
          }
          if (action.payload.financeMessage) {
            proformaInvoice.financeMessage = action.payload.financeMessage;
          }
          if (action.payload.manager) {
            proformaInvoice.manager = action.payload.manager;
          }
          if (action.payload.finance) {
            proformaInvoice.finance = action.payload.finance;
          }
          //  proformaInvoice.status = action.payload.status;
          // proformaInvoice.managerMessage = action.payload.managerMessage;
          //  proformaInvoice.manager = action.payload.manager;
        }
      });
    },
    changeSignedProformaInvoiceStatus: (state, action) => {
      const status = action.payload.status;
      console.log(action.payload);
      state.proformaInvoices.map((proformaInvoice) => {
        if (proformaInvoice.pi_id === action.payload.id) {
          proformaInvoice.status = status;
          proformaInvoice.pi_done_status.push(status);
        } else {
          console.log("not changed status");
        }
      });
    },

    changeUserPassword: (state, action) => {
      state.users.map((user) => {
        if (user._id === action.payload.id) {
          user.password = action.payload.password;
        }
      });
    },
  },
});

export const {
  fetchAllProformaInvoices,
  changeProformaInvoiceStatus,
  changeUserPassword,
  changeSignedProformaInvoiceStatus,
  changeSignedProformaInvoiceStatusSelect,
  deleteProformaInvoiceState,
} = proformaInvoicesSlice.actions;

export default proformaInvoicesSlice.reducer;
