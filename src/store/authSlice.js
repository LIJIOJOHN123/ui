import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const authInitialState = {
  isAuthenticated: false,
  loading: true,
  user: JSON.parse(getLocalStorage("user")),
  status: null,
  token: getLocalStorage("authToken"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    requestSuccess: (state, action) => {
      if (action.payload.token) {
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
    requestFailed: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
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

export const { requestSuccess, requestFail, logOut,requestFailed } = authSlice.actions;

export const authReducer = authSlice.reducer;
export const registerAction = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${backendAPIList.authManagement}/clients/save-validx-client`,
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
      `${backendAPIList.authManagement}/user/login`,
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
export const googleOAuthLoginAction = (token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${backendAPIList.authManagement}/user/oauth`,
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

export const currentUserAction = () => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${backendAPIList.authManagement}/user/current-user`,
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
export const forgotPasswordAction = (formData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${backendAPIList.authManagement}/user/forgotPassword`,
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
      `${backendAPIList.authManagement}/user/resetPassword`,
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
export const updateUserAction = (formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.authManagement}/user/profile`,
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
      dispatch(requestFailed({ message, status: code }));
      toast.error(message);
    }
  } catch (error) {
    const message = error?.response?.data?.message || "An error occurred";
    const status = error?.response?.status || 500;
    dispatch(requestFailed({ message, status }));
    toast.error(message);
  }
};
