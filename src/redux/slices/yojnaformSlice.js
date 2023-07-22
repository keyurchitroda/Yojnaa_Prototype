import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  acNameList: [],
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    acNameListSuccess: (state, action) => {
      state.acNameList = action.payload;
    },
  },
});

// Reducer
export default formSlice.reducer;

//Action
const { acNameListSuccess } = formSlice.actions;

export const ACNameList = (values) => async (dispatch) => {
  try {
    await dispatch(acNameListSuccess(values));
  } catch (e) {
    console.log("e", e);
  }
};
