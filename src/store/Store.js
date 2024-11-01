import { configureStore } from "@reduxjs/toolkit";
import { apiListReducer } from "./apiSlice";
import { authReducer } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    apiList: apiListReducer,
  },
});

export default store;
