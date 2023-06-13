import * as api from "../api/index.js";
import { fetchAll } from "../store/projectSlice.js";
import { setIsLoading } from "../store/showingSlice.js";

export const getAllProjects = () => async (dispatch) => {
  console.log("now7777");
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getAllProjects();
    console.log(data);
    dispatch(fetchAll(data));

    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeProjects = (employee) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    console.log(employee);
    const { data } = await api.getEmployeeProjects(employee);
    console.log(data);
    dispatch(fetchAll(data));

    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};
