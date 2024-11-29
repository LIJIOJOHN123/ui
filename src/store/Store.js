import { configureStore } from "@reduxjs/toolkit";
import { apiBatchingReducer } from "./api_Batching";
import { apiListReducer } from "./apiManagementSlice";
import { authReducer } from "./authSlice";
import { clientManagementReducer } from "./clientManagementSlice";
import { productReducer } from "./productManagementSlice";
import { transactionReducer } from "./transactionSlice";
import { apiGroupManagementReducer } from "./apiGroupManagementSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    apiManagement: apiListReducer,
    apiBatching: apiBatchingReducer,
    clientManagement:clientManagementReducer,
    transaction:transactionReducer,
    apiGroupManagement:apiGroupManagementReducer,
    productManagement:productReducer
  },
});

export default store;
