import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";

import cardReducer from "./slices/cardSlice";

const reducers = combineReducers({
  cardsDetails: cardReducer,
});

const store = configureStore({
  reducer: {
    reducer: reducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export default store;
