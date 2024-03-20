import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";

import { api } from "./apiBase";

export const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});
