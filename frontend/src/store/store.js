import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import filtersSlice from "./filtersSlice";
import piSlice from "./piSlice";
import priceListSlice from "./priceListSlice";
import priceListsSlice from "./priceListsSlice";
import productReducer from "./productSlice";
import productsSlice from "./productsSlice";
import proformaInvoicesSlice from "./proformaInvoicesSlice";
import showingSlice from "./showingSlice";
import usersSlice from "./usersSlice";
import warrantySlice from "./warrantySlice";
import projectSlice from "./projectSlice";
import poSlice from "./poSlice";
import purchaseOrdersSlice from "./Data/purchaseOrdersSlice";
import packingListsSlice from "./Data/packingListSlice";
import stockSlice from "./stockSlice";

export default configureStore({
  reducer: {
    priceList: priceListSlice,
    products: productsSlice,
    products1: productReducer,
    cart: cartSlice,
    pi: piSlice,
    po: poSlice,
    // products: productReducer,
    show: showingSlice,
    filters: filtersSlice,
    warranty: warrantySlice,
    auth: authSlice,
    users: usersSlice,
    priceLists: priceListsSlice,
    proformaInvoices: proformaInvoicesSlice,
    purchaseOrders: purchaseOrdersSlice,
    packingLists: packingListsSlice,
    project: projectSlice,
    stock: stockSlice,
  },
});
