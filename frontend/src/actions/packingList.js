import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { changePackingListStatus, deletePackingListState, fetchAll } from "../store/Data/packingListSlice";

export const getPackingListsAction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getPackingLists();
    dispatch(fetchAll(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeePackingListsAction = (employee) => async (dispatch) => {
  console.log("getEmployeePurchaseOrdersAction");
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getEmployeePackingLists(employee);
    console.log(data);
    dispatch(fetchAll(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

// export const createPurchaseOrder = (newPurchaseOrder) => async (dispatch) => {
//   dispatch(setIsLoading(true));
//   try {
//     console.log(newPurchaseOrder);
//     const { data } = await api.createPurchaseOrder(newPurchaseOrder);
//     console.log(data);
//     dispatch(setIsLoading(false, { status: "success", msg: data.po_no }));
//   } catch (error) {
//     console.log(error);
//     dispatch(setIsLoading(false, { status: "success", msg: error }));
//   }
// };

export const updatePackingListStatus =
  ({ id, newStatus, managerApproval, manager, managerMessage }) =>
  async (dispatch) => {
    console.log({ id, newStatus, managerApproval, manager, managerMessage });
    try {
      const { data } = await api.updatePackingListStatus({
        id,
        newStatus,
        managerMessage,
        managerApproval,
        manager,
      });
      console.log(data);
      dispatch(
        changePackingListStatus({
          id,
          newStatus,
          managerMessage,
          managerApproval,
          manager,
        })
      );
      //  dispatch({ type: UPDATE, payload: data });
      //instant change
    } catch (error) {
      console.log(error);
    }
  };

export const deletePackingList = (id) => async (dispatch) => {
  try {
    await api.deletePackingList(id);
    dispatch(deletePackingListState(id));
    //dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
