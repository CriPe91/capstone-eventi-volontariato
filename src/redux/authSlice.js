import { createSlice } from "@reduxjs/toolkit";

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

export const selectUser = (state) => state.auth.user;
export const selectInit = (state) => state.auth.init;

export default authSlice.reducer;
