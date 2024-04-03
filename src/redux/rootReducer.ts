import { combineReducers } from "@reduxjs/toolkit";
// Reducers
import authReducer from "./slices/AuthSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
