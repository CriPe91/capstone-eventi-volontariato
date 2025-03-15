import { createSlice } from "@reduxjs/toolkit";
import { http } from "../shared/utils/http";

const initialState = {
  user: undefined,
  token: undefined,
  init: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = undefined;
    },
    setInit: (state, action) => {
      state.init = action.payload;
    },
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    resetToken: (state) => {
      localStorage.removeItem("token");
      state.token = undefined;
    },
  },
});

export const { setUser, resetUser, setInit, setToken, resetToken } = authSlice.actions;

export const autoLogin = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    http
      .getAuth("user/me", {
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      })
      .then((res) => {
        dispatch(setUser(res));
      });
  }
};

export const selectUser = (state) => state.auth.user;
export const selectInit = (state) => state.auth.init;

export default authSlice.reducer;
