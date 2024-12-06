import { configureStore } from "@reduxjs/toolkit";
import { apiBatchingReducer } from "./api_Batching";
import { apiListReducer } from "./apiManagementSlice";
import { authReducer } from "./authSlice";
import { clientManagementReducer } from "./clientManagementSlice";
import { productReducer } from "./productManagementSlice";
import { transactionReducer } from "./transactionSlice";
import { apiGroupManagementReducer } from "./apiGroupManagementSlice";
import { planReducer } from "./planSlice";
import { validationReducer } from "./prevalidationSlice";
import { postValidationReducer } from "./postvalidationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    apiManagement: apiListReducer,
    apiBatching: apiBatchingReducer,
    clientManagement: clientManagementReducer,
    transaction: transactionReducer,
    apiGroupManagement: apiGroupManagementReducer,
    productManagement: productReducer,
    plan: planReducer,
    prevalidation: validationReducer,
    postvalidation: postValidationReducer,
  },
});

export default store;
