import userService from "../services/users";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    },
  },
});

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch(setAllUsers(users.data));
  };
};

export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
