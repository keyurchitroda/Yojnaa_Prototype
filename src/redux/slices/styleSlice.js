import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSidebarStyle:
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion",
};

const styleSlice = createSlice({
  name: "styles",
  initialState,
  reducers: {
    sidebarStyleSuccess: (state, action) => {
      state.currentSidebarStyle = action.payload;
    },
  },
});

// Reducer
export default styleSlice.reducer;

//Action
const { sidebarStyleSuccess } = styleSlice.actions;

export const setSidebadeStyle = (values) => async (dispatch) => {
  try {
    await dispatch(sidebarStyleSuccess(values));
  } catch (e) {
    console.log("e", e);
  }
};
