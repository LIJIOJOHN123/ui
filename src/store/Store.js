import { configureStore } from '@reduxjs/toolkit';
import { authReducer, forgotPasswordReducer, registerReducer, resetPasswordReducer } from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
  },
});

export default store;
