import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  ticketItem: [],
  totalItem: 0,
  grocePrice: 0,
}

export const ticketSlice = createSlice({
  name: "ticketCart",
  initialState,
  reducers: {
    addItem: (state, action) => {

      const existProduct = state.ticketItem.find(
        (item) => item.seatDetails._id === action.payload.seatDetails._id
      );

      if (existProduct) {
         toast.warning("You already choose this seat");
      } else {
        state.ticketItem.push( action.payload );
        state.grocePrice += action.payload.seatDetails.price;
        state.totalItem++;
      }
    },
    removeItem: (state) => {
      state.ticketItem = [];
      state.grocePrice = 0
      state.totalItem = 0
    },
  },
});

export const { addItem, removeItem } = ticketSlice.actions;

export default ticketSlice.reducer;
