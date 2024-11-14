import { configureStore } from "@reduxjs/toolkit";
import { apiListReducer } from "./apiSlice";
import { authReducer } from "./authSlice";
import { apiGroupReducer } from "./groupSlice";
import { apiBatchingReducer } from "./api_Batching";
import { clientManagementReducer } from "./clientManagementSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    apiList: apiListReducer,
    groupApi: apiGroupReducer,
    apiBatching: apiBatchingReducer,
    clientManagement:clientManagementReducer
  },
});

export default store;
