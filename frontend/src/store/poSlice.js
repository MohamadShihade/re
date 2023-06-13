/* eslint-disable no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  no: "",
  exporter: "",
  notifyParty: "",
  buyerAddress: "",
  consignee: "",
  portOfOrigin: "CHINA",
  portOfDischarge: "",
  products: [],
  employee: "",
  managerMessage: "",
  currency: "USD",
  note: "",
  incoterms: "",
  manager: "",
  discount: 0,
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
  status: "draft",
};
/*
      price: 0,
      capacity: "0",
      grossWeight: 0,
      netWeight: 0,
      pcsInPallet: 0,
      palletQty: 0,
      totalQty: 0,
      dimension: [""],
      terminal: "",
*/
export const poSlice = createSlice({
  name: "po",
  initialState,
  reducers: {
    addProductToPo: (state, action) => {
      state.products.some((item) => item._id === action.payload._id) ? null : state.products.push({ ...action.payload, qty: 0, price: 0 });
    },
    deleteProductFromPo: (state, action) => {
      let index = state.products.findIndex((obj) => obj._id === action.payload._id);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    setProductTotalQty: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.totalQty = action.payload.totalQty;
        }
      });
    },
    setProductPrice: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.price = action.payload.price;
        }
      });
    },
    setProductPalletQty: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.palletQty = action.payload.palletQty;
        }
      });
    },
    setProductPcsInPallet: (state, action) => {
      state.cart.map((item) => {
        if (action.payload.id === item._id) {
          item.pcsInPallet = action.payload.pcsInPallet;
        }
      });
    },
    emptyPo(state, caction) {
      state.products = [];
    },

    setPoExporter: (state, action) => {
      state.exporter = action.payload;
    },
    setPoBuyerAdress: (state, action) => {
      state.buyerAddress = action.payload;
    },
    setPoConsignee: (state, action) => {
      state.consignee = action.payload;
    },
    setPoNotifyParty: (state, action) => {
      state.notifyParty = action.payload;
    },
    setPoPortOfOrigin: (state, action) => {
      state.portOfOrigin = action.payload;
    },
    setPoPortOfDischarge: (state, action) => {
      state.portOfDischarge = action.payload;
    },
    setPoDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setIncoterms: (state, action) => {
      state.incoterms = action.payload;
    },
    setPiPhoneNumber: (state, action) => {
      state.piInfo.phoneNumber = action.payload;
    },
    setPoNote: (state, action) => {
      state.note = action.payload;
    },
    setPoCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setPoEmployee: (state, action) => {
      state.employee = action.payload;
    },
    setPoManager: (state, action) => {
      state.manager = action.payload;
    },
    setPoManagerMessage: (state, action) => {
      state.managerMessage = action.payload;
    },
    setPoStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  addProductToPo,
  deleteProductFromPo,
  setProductTotalQty,
  setProductPrice,
  setProductPalletQty,
  setProductPcsInPallet,
  emptyPo,
  setPoExporter,
  setPoBuyerAdress,
  setPoConsignee,
  setPoNotifyParty,
  setPoPortOfOrigin,
  setPoPortOfDischarge,
  setPoDiscount,
  setIncoterms,
  setPiPhoneNumber,
  setPoNote,
  setPoCurrency,
  setPoEmployee,
  setPoManager,
  setPoManagerMessage,
  setPoStatus,
} = poSlice.actions;

export default poSlice.reducer;
