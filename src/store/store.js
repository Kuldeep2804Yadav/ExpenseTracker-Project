import { configureStore } from "@reduxjs/toolkit";
import  AuthReducer from "./AuthSlice";
import uiReducer from "./UiSlice";
import profileReducer from './profileSlice';
import expenseReducer from './expenseSlice';

const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    ui:uiReducer,
    profile:profileReducer,
    expense:expenseReducer,
  },
});
export default store;
