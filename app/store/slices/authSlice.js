import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userToken: null,
    email: null,
    username: null,
    password: null,
    isRegistered: false,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userToken = action.payload.userToken;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    register: (state, action) => {
      state.isRegistered = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userToken = null;
      state.email = null;
      state.username = null;
      state.password = null;
      state.isRegistered = false;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
