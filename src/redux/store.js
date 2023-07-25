import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cardReducer from "./slices/cardSlice";
import yojnaFormsReducer from "./slices/yojnaformSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";

const reducers = combineReducers({
  cardsDetails: cardReducer,
  yojnaForms: yojnaFormsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cardsDetails", "yojnaForms"], // only these reducers will be persisted
  blacklist: [""],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    reducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
