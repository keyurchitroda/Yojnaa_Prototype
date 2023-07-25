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
  schemeList: [],
  pageCount: 0,
  currentPage: 1,
  isLoading: false,
  singleBenificaryRecord: {},
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
    setSchemeListValues: (state, action) => {
      state.schemeList = action.payload;
    },
    setPageCountValues: (state, action) => {
      state.pageCount = action.payload;
    },
    setCurrentPageValues: (state, action) => {
      state.currentPage = action.payload;
    },
    lodingTrue: (state, action) => {
      state.isLoading = true;
    },
    lodingFalse: (state, action) => {
      state.isLoading = false;
    },
    setSingleRecordSuccess: (state, action) => {
      state.singleBenificaryRecord = action.payload;
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
  setPageCountValues,
  setSchemeListValues,
  lodingTrue,
  lodingFalse,
  setCurrentPageValues,
  setSingleRecordSuccess,
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

export const GetSearchSchemeValues = (values, currPage) => async (dispatch) => {
  try {
    await dispatch(setSchemeListValues(values.results));
    await dispatch(setPageCountValues(values.count));
    await dispatch(setCurrentPageValues(currPage));
  } catch (e) {
    console.log("e", e);
  }
};

export const setLoadingTrue = (values) => async (dispatch) => {
  try {
    await dispatch(lodingTrue());
  } catch (e) {
    console.log("e", e);
  }
};

export const setLoadingFalse = (values) => async (dispatch) => {
  try {
    await dispatch(lodingFalse());
  } catch (e) {
    console.log("e", e);
  }
};

export const setSingleSchemeRecord = (values) => async (dispatch) => {
  try {
    await dispatch(setSingleRecordSuccess(values));
  } catch (e) {
    console.log("e", e);
  }
};
