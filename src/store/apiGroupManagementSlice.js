import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const apiGroupIntialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// Create category slice
export const apiGroupMangementSlice = createSlice({
  name: "api_group_management",
  initialState: apiGroupIntialState,
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
    createApiGroupResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data];
      state.count = state.data.length;
    },
    createApiGroupResponseFail: (state, action) => {
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
    editApiGroupResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },

    editApiGroupResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Delete
    deleteApiGroupResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1;
    },
    deleteApiGroupResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  request,
  listResponseSuccess,
  listResponseFail,
  createApiGroupResponseSuccess,
  createApiGroupResponseFail,
  deleteApiGroupResponseSuccess,
  deleteApiGroupResponseFail,
  editApiGroupResponseFail,
  editApiGroupResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
} = apiGroupMangementSlice.actions;

export const apiGroupManagementReducer = apiGroupMangementSlice.reducer;

// Fetch API Group List
export const ApiGroupAction =
  (page = 1, limit = 5, searchQueries) =>
  async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.apiGroupManagement}?page=${page}&limit=${limit}&${searchQueries}`,
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
    const res = await axios.get(`${backendAPIList.apiGroupManagement}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
// Add API Group
export const addApiGroupAction = (formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${backendAPIList.apiGroupManagement}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Created Successfully!");
      dispatch(createApiGroupResponseSuccess({ status, data }));
    } else {
      dispatch(createApiGroupResponseFail({ status: 400 }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(createApiGroupResponseFail(payload));
    toast.error(payload.message);
  }
};

// Update API Group
export const updateApiGroupAction = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.apiGroupManagement}/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message, data } = res.data;
    if (status === "ok") {
      toast.success("Updated Successfully!");
      dispatch(editApiGroupResponseSuccess({ status, data }));
    } else {
      dispatch(editApiGroupResponseFail({ status: 400 }));
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(editApiGroupResponseFail(payload));
    toast.error(payload.message);
  }
};

// Delete API Group
export const deleteApiGroupAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${backendAPIList.apiGroupManagement}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      dispatch(deleteApiGroupResponseSuccess({ id, status }));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(deleteApiGroupResponseFail(payload));
    toast.error(payload.message);
  }
};
