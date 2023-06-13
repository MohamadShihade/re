import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { changePurchaseOrderStatus, fetchAll } from "../store/Data/purchaseOrdersSlice";

export const createPurchaseOrder = (newPurchaseOrder) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    console.log(newPurchaseOrder);
    const { data } = await api.createPurchaseOrder(newPurchaseOrder);
    console.log(data);
    dispatch(setIsLoading(false, { status: "success", msg: data.po_no }));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false, { status: "success", msg: error }));
  }
};

export const getPurchaseOrdersAction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getPurchaseOrders();
    dispatch(fetchAll(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeePurchaseOrdersAction = (employee) => async (dispatch) => {
  console.log("getEmployeePurchaseOrdersAction");
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getEmployeePurchaseOrders(employee);
    console.log(data);
    dispatch(fetchAll(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const updatePurchaseOrderStatus =
  ({ id, newStatus, managerMessage, manager }) =>
  async (dispatch) => {
    try {
      const { data } = await api.updatePurchaseOrderStatus({
        id,
        newStatus,
        managerMessage,
        manager,
      });
      console.log(data);
      dispatch(
        changePurchaseOrderStatus({
          id,
          status: newStatus,
          managerMessage,
          manager,
        })
      );
      //  dispatch({ type: UPDATE, payload: data });
      //instant change
    } catch (error) {
      console.log(error);
    }
  };

export const deletePurchaseOrder = (id) => async (dispatch) => {
  try {
    await api.deletePurchaseOrder(id);
    dispatch(deletePurchaseOrder(id));
    //dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
