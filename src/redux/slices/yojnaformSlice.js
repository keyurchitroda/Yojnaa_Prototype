import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  acNameList: [],
  boothNameList: [],
  vibhagNameList: [],
  searchValues: {
    ac_no: "",
    booth_no: "",
    village_name: "",
  },
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    acNameListSuccess: (state, action) => {
      state.acNameList = action.payload;
    },
    boothNameListSuccess: (state, action) => {
      state.boothNameList = action.payload;
    },
    vibhagNameListSuccess: (state, action) => {
      state.vibhagNameList = action.payload;
    },
    searchValues: (state, action) => {
      state.searchValues = { ...state.searchValues, ...action.payload }; // Update specific properties using spread
    },
  },
});

// Reducer
export default formSlice.reducer;

//Action
const {
  acNameListSuccess,
  boothNameListSuccess,
  searchValues,
  vibhagNameListSuccess,
} = formSlice.actions;

export const ACNameList = (values) => async (dispatch) => {
  try {
    await dispatch(acNameListSuccess(values));
  } catch (e) {
    console.log("e", e);
  }
};

export const BoothNameList = (values) => async (dispatch) => {
  try {
    await dispatch(boothNameListSuccess(values));
  } catch (e) {
    console.log("e", e);
  }
};

export const VibhagNameList = (values) => async (dispatch) => {
  try {
    await dispatch(vibhagNameListSuccess(values));
  } catch (e) {
    console.log("e", e);
  }
};

export const setSearchValues = (values) => async (dispatch) => {
  try {
    await dispatch(searchValues(values));
  } catch (e) {
    console.log("e", e);
  }
};

export const clearVlaue = (values) => async (dispatch) => {
  try {
    await dispatch(acNameListSuccess([]));
    await dispatch(boothNameListSuccess([]));
    await dispatch(searchValues({}));
  } catch (e) {
    console.log("e", e);
  }
};
