import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const initialState = null;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action) {
      window.localStorage.setItem("loggedUser", JSON.stringify(action.payload));
      blogService.setToken(action.payload.token);
      return action.payload;
    },
  },
});

export const loginUser = (userDetails) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userDetails);
      dispatch(setUser(user));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
