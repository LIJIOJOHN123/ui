import { configureStore } from "@reduxjs/toolkit";
import { apiListReducer } from "./apiManagementSlice";
import { authReducer } from "./authSlice";
import { clientManagementReducer } from "./clientManagementSlice";
import { productReducer } from "./productManagementSlice";
import { transactionReducer } from "./transactionSlice";
import { apiGroupManagementReducer } from "./apiGroupManagementSlice";
import { planReducer } from "./planSlice";
import { validationReducer } from "./prevalidationSlice";
import { postValidationReducer } from "./postvalidationSlice";
import { apiReponseManagementReducer } from "./apiResponseManagement";
import { paymentReducer } from "./paymentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    apiManagement: apiListReducer,
    apiResponseManagement: apiReponseManagementReducer,
    clientManagement: clientManagementReducer,
    transaction: transactionReducer,
    apiGroupManagement: apiGroupManagementReducer,
    productManagement: productReducer,
    plan: planReducer,
    prevalidation: validationReducer,
    postvalidation: postValidationReducer,
    payment:paymentReducer
  },
});

export default store;
