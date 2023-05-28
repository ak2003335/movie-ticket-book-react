import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload) {
        state.isLoggedin = true;
        state.user = action.payload;
      } else {
        state.isLoggedin = false;
        state.user = {};
      }
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.user = {};
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
