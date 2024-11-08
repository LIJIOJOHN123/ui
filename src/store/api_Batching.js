import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";

const apiBatchingInitialState = {
  loading: false,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// Create API Batching slice
export const apiBatchingSlice = createSlice({
  name: "api_Batching",
  initialState: apiBatchingInitialState,
  reducers: {
    // Request
    request: (state) => {
      state.loading = true;
    },
    // List
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
    // Add
    createAPIBatchingResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.count = state.data.length;
    },
    createAPIBatchingResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    getByIdResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.dataById = action.payload.data;
    },
    getByIdResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Edit
    editAPIBatchingResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    editAPIBatchingResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Delete
    deleteAPIBatchingResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1;
    },
    deleteAPIBatchingResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  request,
  listResponseSuccess,
  listResponseFail,
  createAPIBatchingResponseSuccess,
  createAPIBatchingResponseFail,
  deleteAPIBatchingResponseSuccess,
  deleteAPIBatchingResponseFail,
  editAPIBatchingResponseFail,
  editAPIBatchingResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
} = apiBatchingSlice.actions;

export const apiBatchingReducer = apiBatchingSlice.reducer;

// Fetch API Batching List
export const apiBatchingAction = () => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.get(`${process.env.REACT_APP_Base_WEB_URL}/apis`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { status, data, count } = res.data;
    if (status === "ok") {
      dispatch(listResponseSuccess({ data, status, count }));
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

// Fetch API By ID
export const getByIdAPIAction = (id) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_WEB_URL}/apis/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, data } = res.data;
    if (status === "ok") {
      dispatch(getByIdResponseSuccess({ status, data }));
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
// Add API Batching
export const addAPIBatchingAction = (formData) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${process.env.REACT_APP_Base_WEB_URL}/apis`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status } = res.data;
    if (status === "ok") {
      toast.success("Created Successfully!");
      dispatch(createAPIBatchingResponseSuccess({ status:"done" }));
    } else {
      dispatch(createAPIBatchingResponseFail({ status: 400 }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(createAPIBatchingResponseFail(payload));
    toast.error(payload.message);
  }
};

// Update API Batching
export const updateAPIBatchingAction = (id, formData) => async (dispatch) => {
  try {
    console.log(formData, "redux");
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${process.env.REACT_APP_Base_WEB_URL}/apis/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message, data } = res.data;
    if (status === "ok") {
      toast.success("Updated Successfully!");
      dispatch(editAPIBatchingResponseSuccess({ status, data }));
    } else {
      dispatch(editAPIBatchingResponseFail({ status: 400 }));
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(editAPIBatchingResponseFail(payload));
    toast.error(payload.message);
  }
};

// Delete API Batching
export const deleteAPIBatchingAction = (id) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${process.env.REACT_APP_Base_WEB_URL}/apis/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      dispatch(deleteAPIBatchingResponseSuccess({ id, status }));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(deleteAPIBatchingResponseFail(payload));
    toast.error(payload.message);
  }
};
