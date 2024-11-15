import { configureStore } from "@reduxjs/toolkit";
import { apiBatchingReducer } from "./api_Batching";
import { apiListReducer } from "./apiSlice";
import { authReducer } from "./authSlice";
import { clientManagementReducer } from "./clientManagementSlice";
import { apiGroupReducer } from "./groupSlice";
import { transactionReducer } from "./transactionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    apiList: apiListReducer,
    groupApi: apiGroupReducer,
    apiBatching: apiBatchingReducer,
    clientManagement:clientManagementReducer,
    transaction:transactionReducer
  },
});

export default store;
