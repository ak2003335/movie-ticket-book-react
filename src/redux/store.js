import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import theatereducer from "./ticket/ticketSlice";
import seatReducer from "./ticketCart/cart";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    theater: theatereducer,
    cart: seatReducer,
  },
});
