import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";

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

const forgotPasswordInitialState = {
  loading: false,
  message: null,
  status: null,
};
const ResetPasswordInitialState = {
  loading: false,
  message: null,
  status: null,
  isAuthenticated: false
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
    authEnd: (state) => {

      state.loading = false;

    },
    logOut: (state) => {
      // state.isAuthenticated = false;
      // state.user = null;
      state.loading = false;
      state.message = "Logged out successfully";
      state.status = 200;
      state.token = null
    },
  },
});

// forgotPassword Slice
export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: forgotPasswordInitialState,
  reducers: {
    forgotPasswordStart: (state) => {
      state.loading = true;
      state.message = null;
      state.status = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    forgotPasswordFail: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    resetForgotPasswordState: (state) => {
      state.loading = false;
      state.message = null;
      state.status = null;
    },
  },
});
// ResetPassword Slice
export const ResetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: ResetPasswordInitialState,
  reducers: {
    resetPasswordStart: (state) => {
      state.loading = true;
      state.message = null;
      state.status = null;
      state.isAuthenticated = false;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    resetPasswordFail: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.isAuthenticated = false;
    },
    resetResetPasswordState: (state) => {
      state.loading = false;
      state.message = null;
      state.status = null;
      state.isAuthenticated = false;
    },
  },
});




// Actions and reducers exports
export const { authSuccess, authFail, logOut, authStart, authEnd } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const { registerStart, registerSuccess, registerFail, resetRegister } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;

export const { forgotPasswordStart, forgotPasswordSuccess, forgotPasswordFail, resetForgotPasswordState } = forgotPasswordSlice.actions;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;

export const { resetPasswordStart, resetPasswordSuccess, resetPasswordFail, resetResetPasswordState, } = ResetPasswordSlice.actions;
export const resetPasswordReducer = ResetPasswordSlice.reducer;

// Modified registerAction
export const registerAction = (formData) => async (dispatch) => {
  try {

    dispatch(registerStart());
    const res = await axios.post(process.env.REACT_APP_Base_URL + "/clients/save-validx-client", formData);
    const { status, message, data, code } = res.data;
    if (code === "201") {
      const payload = {
        user: {
          name: data?.name,
          email: data?.email,
          country: data?.country,
          phone_number: data?.phone_number,
          company: data?.company,
          website: data?.website
        },
        message,
        status,
        token: data?.token
      };
      dispatch(registerSuccess(payload));
      toast.success(message)
    } else {
      const payload = {
        user: null,
        message: message,
        status: code,
      };
      dispatch(registerFail(payload));
      toast.error(message)
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "Network error",
      status: error?.response?.status || 500,
    };
    dispatch(registerFail(payload));
    toast.error(payload.message)
  }
};
export const loginAction = (formData) => async (dispatch) => {
  try {

    dispatch(authStart())
    const res = await axios.post(process.env.REACT_APP_Base_URL + "/user/login", formData);

    const { status, message, data, code,  } = res.data;

    if (code === "200") {

      const payload = {
        user: {
          name: data?.name,
          email: data?.email,
          country: data?.country,
          phone_number: data?.phone_number,
          company: data?.company,
          website: data?.website,
          backend_apikey: data?.backend_apikey,
          apikey: data?.apikey
        },
        message,
        status,
        token: data?.token
      };
      console.log(payload, "payload")
      dispatch(authSuccess(payload));
      toast.success(message)
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message,
      status: error?.response?.status,
    };
    dispatch(authFail(payload));
    toast.error(payload.message)
  }
};
export const googleOAuthLoginAction = (token) => async (dispatch) => {

  try {

    dispatch(authStart())

    // const res = await axios.post(process.env.REACT_APP_Base_URL + "/user/oauth", { token });
    // const { status, message, data, code } = res.data;
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
    const token = getLocalStorage("authToken")
    const res = await axios.get(process.env.REACT_APP_Base_URL + "/user/current-user", { headers: { Authorization: `Bearer ${token}` } });
    const { status, message, data, code } = res.data;
    if (code === "200") {
      const payload = {
        user: {
          name: data?.name,
          email: data?.email,
          country: data?.country,
          phone_number: data?.phone_number,
          company: data?.company,
          website: data?.website,
          backend_apikey: data?.backend_apikey,
          apikey: data?.apikey
        },
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


// forgotPassword
export const forgotPasswordAction = (formData) => async (dispatch) => {
  try {
    dispatch(forgotPasswordStart())
    const res = await axios.put(process.env.REACT_APP_Base_URL + "/user/forgotPassword", formData);

    const { status, message, code } = res.data;
    if (code === 200) {
      const payload = {
        message,
        status,
      };

      dispatch(forgotPasswordSuccess(payload));
      toast.success(message)
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message,
      status: error?.response?.status,
    };
    dispatch(forgotPasswordFail(payload));
    toast.error(payload.message)
  }
};
export const ResetPasswordAction = (formData) => async (dispatch) => {
  try {
    dispatch(resetPasswordStart());

    const res = await axios.put(process.env.REACT_APP_Base_URL + "/user/resetPassword", formData);
    const { status, message, code } = res.data;

    if (code === 200) {
      const payload = {
        isAuthenticated: true,
        message,
        status,
      };
      dispatch(resetPasswordSuccess(payload));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(resetPasswordFail(payload));
    toast.error(payload.message);
  }
};



// UpdateUser Details
export const UpdateUserAction = (formData) => async (dispatch) => {
  try {

    dispatch(authStart())
    const token = getLocalStorage("authToken")
    const res = await axios.put(process.env.REACT_APP_Base_URL + "/user/profile", formData, { headers: { Authorization: `Bearer ${token}` } });

    const { status, message, data, code } = res.data;
    console.log(res.data, " res.data")
    if (code === "203") {
      const payload = {
        message,
        status,
        token: data?.token
      };
      dispatch(authSuccess(payload));

      toast.success("Updated Successfully");
      dispatch(currentUserAction())
    } else {
      const payload = {
        user: null,
        message: message,
        status: code,
      };
      dispatch(authEnd(payload));
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message,
      status: error?.response?.status,
    }
    toast.error(payload.message);
    dispatch(authEnd(payload));
  }
};
