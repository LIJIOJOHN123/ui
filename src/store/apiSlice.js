import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";

const apiListInitialState = {
  loading: false,
  data: [],
  status: null,
  count: null,
};

// Get ALL apiList slice
export const apiListSlice = createSlice({
  name: "apiList",
  initialState: apiListInitialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    listResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    listResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // ///////ADD
    createResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    createResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    // ///////delete
    deleteResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1;
    },
    deleteResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // edit 
  },
});

export const {
  createRequest,
  createReset,
  createResponseFail,
  createResponseSuccess,
  deleteRequest,
  deleteReset,
  deleteResponseFail,
  deleteResponseSuccess,
  listRequest,
  listReset,
  listResponseFail,
  listResponseSuccess,
} = apiListSlice.actions;

export const apiListReducer = apiListSlice.reducer;

export const apiListAction = () => async (dispatch) => {
  try {
    dispatch(listRequest());
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_WEB_URL}/apilist`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message, data, count } = res.data;
    if (status === "ok") {
      const payload = {
        data,
        message,
        status,
        count,
      };
      dispatch(listResponseSuccess(payload));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };

    dispatch(listResponseFail(payload));
    toast.error(payload.message);
  }
};

export const AddApiAction = (formData) => async (dispatch) => {
  try {
    dispatch(createRequest());
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${process.env.REACT_APP_Base_WEB_URL}/apilist`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      toast.success("Created Successfully!");
      dispatch(createResponseSuccess({ status }));
    } else {
      dispatch(createResponseFail({ status: 400 }));
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };

    dispatch(createResponseFail(payload));
    toast.error(payload.message);
  }
};

// deleteApi
export const deleteApiAction = (id) => async (dispatch) => {
  try {
    dispatch(listRequest());
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${process.env.REACT_APP_Base_WEB_URL}/apilist/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      const payload = { id };
      dispatch(deleteResponseSuccess(payload));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };

    dispatch(deleteResponseFail(payload)); // Dispatch failure action
    toast.error(payload.message); // Show error toast notification
  }
};
