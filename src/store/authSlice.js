import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../utils/LocalStorage";

const authInitialState = {
  isAuthenticated: false,
  loading: true,
  user: JSON.parse(getLocalStorage("user")),
  status: null,
  token: getLocalStorage("authToken"),
};

// Auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    requestSuccess: (state, action) => {
      if(action.payload.token){
        setLocalStorage("authToken", action.payload.token);
        setLocalStorage("user", JSON.stringify(action.payload.user));
      }
      state.isAuthenticated = true;
      state.loading = false;
      state.user = JSON.parse(getLocalStorage("user"));
      state.token = getLocalStorage("authToken");
      state.status = action.payload.status;
    },
    requestFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.token = removeLocalStorage("authToken");
      state.user = removeLocalStorage("user");
      state.isAuthenticated = false;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = removeLocalStorage("user");
      state.loading = false;
      state.status = null;
      state.token = removeLocalStorage("authToken");
    },
  },
});

export const { requestSuccess, requestFail, logOut } =
  authSlice.actions;

export const authReducer = authSlice.reducer;

// Authentication Actions
export const registerAction = (formData) => async (dispatch) => {;
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_Base_URL}/clients/save-validx-client`,
      formData
    );
    const { status, message, data, code } = res.data;
    if (code === "201") {
      dispatch(requestSuccess({ user: data, status, token: data.token }));
      toast.success("Registered successfully!");
    } else {
      dispatch(requestFail({ message, status: code }));
      toast.error(message);
    }
  } catch (error) {
    const message = error?.response?.data?.message || "An error occurred";
    const status = error?.response?.status || 500;
    dispatch(requestFail({ message, status }));
    toast.error(message);
  }
};

export const loginAction = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_Base_URL}/user/login`,
      formData
    );
    const { status, message, data, code } = res.data;
    if (code === "200") {
      dispatch(requestSuccess({ user: data, status, token: data.token }));
      toast.success("Login successful!");
    } else {
      dispatch(requestFail({ message, status: code }));
      toast.error(message);
    }
  } catch (error) {
    const message = error?.response?.data?.message || "An error occurred";
    const status = error?.response?.status || 500;
    dispatch(requestFail({ message, status }));
    toast.error(message);
  }
};

// Google OAuth Action
export const googleOAuthLoginAction = (token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_Base_URL}/user/oauth`,
      { token }
    );
    const { status, message, data, code } = res.data;
    if (code === "200") {
      dispatch(
        requestSuccess({
          user: data,
          status,
          token: data.token,
        })
      );
      toast.success("Login successful via Google!");
    } else {
      dispatch(requestFail({ message, status: code }));
      toast.error(message);
    }
  } catch (error) {
    const message = error?.response?.data?.message || "An error occurred";
    const status = error?.response?.status || 500;
    dispatch(requestFail({ message, status }));
    toast.error(message);
  }
};

// Current User Action
export const currentUserAction = () => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_URL}/user/current-user`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, data, code } = res.data;

    if (code === "200") {
      dispatch(requestSuccess({ user: data, status, token: data.token }));
    }
  } catch (error) {
    const message = error?.response?.data?.message || "An error occurred";
    const status = error?.response?.status || 500;
    dispatch(requestFail({ message, status }));
    toast.error(message);
  }
};

// Password Actions
export const forgotPasswordAction = (formData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_Base_URL}/user/forgotPassword`,
      formData
    );
    const { status } = res.data;
    if (status === "ok") {
      dispatch(
        requestSuccess({
          status: 200,
          isAuthenticated: false,
          user: null,
          token: null,
        })
      );
      toast.success("Forgot password email sent successfully.");
    }
  } catch (error) {
    const message = error?.response?.data?.message || "An error occurred";
    const status = error?.response?.status || 500;
    dispatch(requestFail({ message, status }));
    toast.error(message);
  }
};

export const resetPasswordAction = (formData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_Base_URL}/user/resetPassword`,
      formData
    );
    const { status } = res.data;
    if (status === "ok") {
      dispatch(
        requestSuccess({
          status,
          isAuthenticated: false,
          user: null,
          token: null,
        })
      );
      toast.success(
        "Your password has been reset successfully! You can now log in with your new password."
      );
    }
  } catch (error) {
    const message = error?.response?.data?.message || "An error occurred";
    const status = error?.response?.status || 500;
    dispatch(requestFail({ message, status }));
    toast.error(message);
  }
};

// User Update Action
export const updateUserAction = (formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${process.env.REACT_APP_Base_URL}/user/profile`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { message, code } = res.data;
    if (code === "203") {
      toast.success("Updated Successfully");
      dispatch(currentUserAction());
    } else {
      dispatch(requestFail({ message, status: code }));
      toast.error(message);
    }
  } catch (error) {
    const message = error?.response?.data?.message || "An error occurred";
    const status = error?.response?.status || 500;
    dispatch(requestFail({ message, status }));
    toast.error(message);
  }
};
