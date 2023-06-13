import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { setPiNo } from "../store/piSlice";
import { changeProformaInvoiceStatus, changeSignedProformaInvoiceStatus, fetchAllProformaInvoices } from "../store/proformaInvoicesSlice";
import { deleteProductState } from "../store/productsSlice";

export const createProformaInvoice = (newProformaInvoice) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const { data } = await api.createProformaInvoice(newProformaInvoice);
    console.log(data);
    dispatch(setIsLoading(false, { status: "success", msg: data.pi_no }));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false, { status: "success", msg: error }));
  }
};

export const getLastPiNo = () => async (dispatch) => {
  const lastPiNo = await api.getLastPiNo();
  console.log(lastPiNo.data);

  dispatch(setPiNo(lastPiNo.data));
};

export const updateProformaInvoiceStatus = (data) => async (dispatch) => {
  try {
    const { res_data } = await api.updateProformaInvoiceStatus(data);
    console.log(res_data);
    dispatch(changeProformaInvoiceStatus(data));
  } catch (error) {
    console.log(error);
  }
};

export const getProformaInvoicesAction = () => async (dispatch) => {
  console.log("🚀 ~ file: proformaInvoice.js:26 ~ getProformaInvoicesAction ~ getProformaInvoicesAction:");
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getProformaInvoices();
    console.log(data);
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeProformaInvoicesAction = (employee) => async (dispatch) => {
  console.log("🚀 ~ file: proformaInvoice.js:26 ~ getProformaInvoicesAction ~ getProformaInvoicesAction:");
  try {
    dispatch(setIsLoading(true));
    console.log(employee);
    const { data } = await api.getEmployeeProformaInvoices(employee);
    console.log(data);
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const updateProformaInvoice = (id, pi) => async (dispatch) => {
  console.log("here");
  console.log(id);

  try {
    const { data } = await api.updateProformaInvoice(id, pi);
    console.log(data);
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};

export const getSignedProformaInvoicesAction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getSignedProformaInvoices();
    console.log(data);
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getSignedEmployeeProformaInvoicesAction = (employee) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    console.log(employee);
    const { data } = await api.getSignedEmployeeProformaInvoices(employee);
    console.log(data);
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const updateSignedProformaInvoiceStatus =
  ({ id, status, currentStage, doneStages, stageNumber }) =>
  async (dispatch) => {
    console.log("🚀 ", { id, currentStage, doneStages, stageNumber });

    try {
      dispatch(changeSignedProformaInvoiceStatus({ id, status }));

      /*  const { data } = await api.updateSignedProformaInvoiceStatus({
        id,
        status,
      }); */
      console.log("");

      //  dispatch({ type: UPDATE, payload: data });
      //instant change
    } catch (error) {
      console.log(error);
    }
  };

export const deleteProformaInvoice = (id) => async (dispatch) => {
  try {
    await api.deleteProformaInvoice(id);
    dispatch(deleteProductState(id));
    //dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
