import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";

const apiGroupInitialState = {
  loading: false,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// Create API Group slice
export const apiGroupSlice = createSlice({
  name: "apiGroup",
  initialState: apiGroupInitialState,
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
    createAPIGroupResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data];
      state.count = state.data.length;
    },
    createAPIGroupResponseFail: (state, action) => {
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
    editAPIGroupResponseSuccess: (state, action) => {


      state.loading = false;
      state.status = action.payload.status;
    },

    editAPIGroupResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Delete
    deleteAPIGroupResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1;
    },
    deleteAPIGroupResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  request,
  listResponseSuccess,
  listResponseFail,
  createAPIGroupResponseSuccess,
  createAPIGroupResponseFail,
  deleteAPIGroupResponseSuccess,
  deleteAPIGroupResponseFail,
  editAPIGroupResponseFail,
  editAPIGroupResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
} = apiGroupSlice.actions;

export const apiGroupReducer = apiGroupSlice.reducer;

// Fetch API Group List
export const apiGroupAction = () => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_WEB_URL}/apigroup`,
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
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_WEB_URL}/apigroup/${id}`,
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
// Add API Group
export const addAPIGroupAction = (formData) => async (dispatch) => {
  try {
    console.log(formData, "formData");
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${process.env.REACT_APP_Base_WEB_URL}/apigroup`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Created Successfully!");
      dispatch(createAPIGroupResponseSuccess({ status, data }));
    } else {
      dispatch(createAPIGroupResponseFail({ status: 400 }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(createAPIGroupResponseFail(payload));
    toast.error(payload.message);
  }
};

// Update API Group
export const updateAPIGroupAction = (id, formData) => async (dispatch) => {
  try {
    console.log(formData,"redux")
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${process.env.REACT_APP_Base_WEB_URL}/apigroup/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message, data } = res.data;
    if (status === "ok") {
      toast.success("Updated Successfully!");
      dispatch(editAPIGroupResponseSuccess({ status, data }));
    } else {
      dispatch(editAPIGroupResponseFail({ status: 400 }));
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(editAPIGroupResponseFail(payload));
    toast.error(payload.message);
  }
};

// Delete API Group
export const deleteAPIGroupAction = (id) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${process.env.REACT_APP_Base_WEB_URL}/apigroup/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      dispatch(deleteAPIGroupResponseSuccess({ id, status }));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(deleteAPIGroupResponseFail(payload));
    toast.error(payload.message);
  }
};
