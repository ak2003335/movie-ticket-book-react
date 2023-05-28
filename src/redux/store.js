import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import theatereducer from "./ticket/ticketSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    theater: theatereducer,
  },
});
