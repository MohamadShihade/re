import * as api from "../api/index.js";
import { setIsLoading } from "../store/showingSlice";
import { fetchAllUsers } from "../store/usersSlice";

export const getUsersAction = () => async (dispatch) => {
    try {
      // console.log("page : " + page);
      dispatch(setIsLoading(true));
      const {data} = await api.fetchUsersApi();
       console.log(data);
      dispatch(fetchAllUsers(data));
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  export const updateUser = (id, user) => async (dispatch) => {
    console.log("here");
    console.log(id , user);
  
    try {
      const { data } = await api.updateUser(id, user);
      console.log(data);
      //  dispatch({ type: UPDATE, payload: data });
      //instant change
    } catch (error) {
      console.log(error);
    }
  };
  
  
export const createUser = (newUser) => async (dispatch) => {
  console.log(newUser);
  try {
    const { data } = await api.createUser(newUser);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(id);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}