import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleTheater: {},
  allTheater: [],
};

export const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {
    allTheaters: (state, action) => {
      state.allTheater = action.payload;
    },
    theaterRed: (state, action) => {
      state.singleTheater = action.payload;
    },
  },
});

export const { allTheaters, theaterRed } = theaterSlice.actions;

export default theaterSlice.reducer;
