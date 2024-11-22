import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";

const categoryInitialState = {
  loading: false,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// Create category slice
export const categorySlice = createSlice({
  name: "category",
  initialState: categoryInitialState,
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
    createcategoryResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data];
      state.count = state.data.length;
    },
    createcategoryResponseFail: (state, action) => {
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
    editcategoryResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },

    editcategoryResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Delete
    deletecategoryResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1;
    },
    deletecategoryResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  request,
  listResponseSuccess,
  listResponseFail,
  createcategoryResponseSuccess,
  createcategoryResponseFail,
  deletecategoryResponseSuccess,
  deletecategoryResponseFail,
  editcategoryResponseFail,
  editcategoryResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
} = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;

// Fetch API Group List
export const categoryAction = () => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_WEB_URL}/category`,
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
      `${process.env.REACT_APP_Base_WEB_URL}/category/${id}`,
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
export const addcategoryAction = (formData) => async (dispatch) => {
  try {
    console.log(formData, ">>>>>>>>>");
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${process.env.REACT_APP_Base_WEB_URL}/category`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Created Successfully!");
      dispatch(createcategoryResponseSuccess({ status, data }));
    } else {
      dispatch(createcategoryResponseFail({ status: 400 }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(createcategoryResponseFail(payload));
    toast.error(payload.message);
  }
};

// Update API Group
export const updatecategoryAction = (id, formData) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${process.env.REACT_APP_Base_WEB_URL}/category/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message, data } = res.data;
    if (status === "ok") {
      toast.success("Updated Successfully!");
      dispatch(editcategoryResponseSuccess({ status, data }));
    } else {
      dispatch(editcategoryResponseFail({ status: 400 }));
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(editcategoryResponseFail(payload));
    toast.error(payload.message);
  }
};

// Delete API Group
export const deletecategoryAction = (id) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${process.env.REACT_APP_Base_WEB_URL}/category/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      dispatch(deletecategoryResponseSuccess({ id, status }));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(deletecategoryResponseFail(payload));
    toast.error(payload.message);
  }
};
