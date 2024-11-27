import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const apiMangementIntiaiState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// Get ALL apiList slice
export const apiMangementSlice = createSlice({
  name: "api_management",
  initialState: apiMangementIntiaiState,
  reducers: {
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
    createResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data]; // Append new item
      state.count = state.data.length; // Update count based on the new data length
    },

    createResponseFail: (state, action) => {
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
    // edit
    updateResponseSuccess: (state, action) => {
      const index = state.data.findIndex(
        (item) => item._id === action.payload.data._id
      );

      if (index !== -1) {
        const updatedItem = { ...state.data[index], ...action.payload.data };

        state.data[index] = updatedItem;
      } else {
        console.warn(`Item with id } not found in state.data`);
      }

      state.loading = false;
      state.status = action.payload.status;
    },

    updateResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Delete
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
  },
});

export const {
  request,
  listResponseSuccess,
  listResponseFail,
  createResponseSuccess,
  createResponseFail,
  deleteResponseSuccess,
  deleteResponseFail,
  updateResponseFail,
  updateResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
} = apiMangementSlice.actions;

export const apiListReducer = apiMangementSlice.reducer;

// Fetch API List
export const apiListAction = () => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      backendAPIList.apiManagement,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${backendAPIList.apiManagement}/${id}`,
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

// Add API
export const addApiGroupAction = (formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${backendAPIList.apiManagement}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Created Successfully!");
      dispatch(createResponseSuccess({ status, data }));
    } else {
      dispatch(createResponseFail({ status: 400 }));
      // toast.error(message);
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
// update API
export const updateApiAction = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.apiManagement}/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message, data } = res.data;
    if (status === "ok") {
      toast.success("Updated Successfully!");
      dispatch(updateResponseSuccess({ status, data }));
    } else {
      dispatch(updateResponseFail({ status: 400 }));
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

// Delete API
export const deleteApiAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${backendAPIList.apiManagement}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      dispatch(deleteResponseSuccess({ id, status }));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(deleteResponseFail(payload));
    toast.error(payload.message);
  }
};
