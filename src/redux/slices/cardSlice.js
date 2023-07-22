import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  ac_details: {},
  booth_details: {},
  scheme_details: {},
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    acDetailsSuccess: (state, action) => {
      state.ac_details = action.payload;
    },
    boothDetailsSuccess: (state, action) => {
      state.booth_details = action.payload;
    },
    schemehDetailsSuccess: (state, action) => {
      state.scheme_details = action.payload;
    },
  },
});

// Reducer
export default cardSlice.reducer;

//Action
const { acDetailsSuccess, boothDetailsSuccess, schemehDetailsSuccess } =
  cardSlice.actions;

export const ACDetails = (values) => async (dispatch) => {
  try {
    await dispatch(acDetailsSuccess(values));
  } catch (e) {
    console.log("e", e);
  }
};

export const BoothDetails = (values) => async (dispatch) => {
  try {
    await dispatch(boothDetailsSuccess(values));
  } catch (e) {
    console.log("e", e);
  }
};

export const SchemeDetails = (values) => async (dispatch) => {
  try {
    await dispatch(schemehDetailsSuccess(values));
  } catch (e) {
    console.log("e", e);
  }
};
