import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authInitialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  message: null,
  status: null,
  token: null,
};

const registerInitialState = {
  loading: false,
  message: null,
  status: null,
  user: null,
  token: null,
};

// Register slice
export const registerSlice = createSlice({
  name: "register",
  initialState: registerInitialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.message = null;
      state.status = null;
      state.user = null;
      state.token = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.user = null;
      state.token = null;
    },
    resetRegister: (state) => {
      state.loading = false;
      state.message = null;
      state.status = null;
      state.user = null;
      state.token = null;
    },
  },
});

// Auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {

    authStart: (state, action) => {
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.token = action.payload.token;
    },
    authFail: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.token = null
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.message = "Logged out successfully";
      state.status = 200;
      state.token = null
    },
  },
});

// Actions and reducers exports
export const { authSuccess, authFail, logOut, authStart } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const { registerStart, registerSuccess, registerFail, resetRegister } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;

// Modified registerAction
export const registerAction = (formData) => async (dispatch) => {
  try {

    dispatch(registerStart());
    const res = await axios.post(process.env.REACT_APP_Base_URL + "/clients/save-validx-client", formData);
    const { status, message, data, code } = res.data;
    if (code === "201") {
      const payload = {
        user: { name: data?.name, email: data?.email },
        message,
        status,
        token: data?.token
      };
      dispatch(registerSuccess(payload));
    } else {
      const payload = {
        user: null,
        message: message,
        status: code,
      };
      dispatch(registerFail(payload));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "Network error",
      status: error?.response?.status || 500,
    };
    dispatch(registerFail(payload));
  }
};
export const loginAction = (formData) => async (dispatch) => {
  try {
    dispatch(authStart())
    const res = await axios.post(process.env.REACT_APP_Base_URL + "/user/login", formData);
    const { status, message, data, code } = res.data;
    if (code === "200") {
      const payload = {
        user: { name: data?.name, email: data?.email },
        message,
        status,
        token: data?.token
      };
      dispatch(authSuccess(payload));
    } else {
      const payload = {
        user: null,
        message: message,
        status: code,
      };
      dispatch(authFail(payload));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message,
      status: error?.response?.status,
    };
    dispatch(authFail(payload));
  }
};
export const googleOAuthLoginAction = (token) => async (dispatch) => {
  console.log(token, "token>>>>>>>")
  try {
   
    dispatch(authStart())

    const res = await axios.post(process.env.REACT_APP_Base_URL + "/user/oauth", { token });
    const { status, message, data, code } = res.data;
    // if (code === "200") {
    //   const payload = {
    //     user: { name: data?.name, email: data?.email },
    //     message,
    //     status,
    //     token: data?.token
    //   };
    //   dispatch(authSuccess(payload));
    // } else {
    //   const payload = {
    //     user: null,
    //     message: message,
    //     status: code,
    //   };
    //   dispatch(authFail(payload));
    // }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message,
      status: error?.response?.status,
    };
    dispatch(authFail(payload));
  }
};
export const currentUserAction = () => async (dispatch) => {
  try {
    dispatch(authStart())
    const token = localStorage.getItem("authToken")
    const res = await axios.get(process.env.REACT_APP_Base_URL + "/user/current-user", { headers: { Authorization: `Bearer ${token}` } });
    const { status, message, data, code } = res.data;
    if (code === "200") {
      const payload = {
        user: { name: data?.name, email: data?.email },
        message,
        status,
        token: data?.token
      };
      dispatch(authSuccess(payload));

    } else {
      const payload = {
        user: null,
        message: message,
        status: code,
      };
      dispatch(authFail(payload));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message,
      status: error?.response?.status,
    };
    dispatch(authFail(payload));
  }
};


