import { configureStore } from '@reduxjs/toolkit';
import { authReducer, registerReducer } from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer
  },
});

export default store;
