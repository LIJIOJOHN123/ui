import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";

const planInitialState = {
  loading: false,
  data: [],
  status: null,
  count: null,
  dataById: {},
  apiListDetails: [],
};

// Create plan slice
export const planSlice = createSlice({
  name: "plan",
  initialState: planInitialState,
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
    createplanResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data];
      state.count = state.data.length;
    },
    createplanResponseFail: (state, action) => {
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
    getByIdApiResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.apiListDetails = action.payload.data;
    },
    getByIdApiResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Edit
    editplanResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },

    editplanResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Delete
    deleteplanResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1;
    },
    deleteplanResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    resetApiListDetails: (state) => {
      state.apiListDetails = [];
      state.dataById = {};
    },
  },
});

export const {
  request,
  listResponseSuccess,
  listResponseFail,
  createplanResponseSuccess,
  createplanResponseFail,
  deleteplanResponseSuccess,
  deleteplanResponseFail,
  editplanResponseFail,
  editplanResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
  getByIdApiResponseFail,
  getByIdApiResponseSuccess,
  resetApiListDetails,
} = planSlice.actions;

export const planReducer = planSlice.reducer;

// Fetch API Group List
export const planAction =
  (page = 1, limit = 5, searchQueries) =>
  async (dispatch) => {
    try {
      dispatch(request());
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${process.env.REACT_APP_Base_WEB_URL}/plan?page=${page}&limit=${limit}&${searchQueries}`,
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

// Fetch Plan By ID
export const getByIdPlanAction = (id) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_WEB_URL}/plan/${id}`,
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
export const getplanApiListAPIAction = (id) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_WEB_URL}/plan/category-apilist/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, data } = res.data;

    if (status === "ok") {
      dispatch(getByIdApiResponseSuccess({ status, data }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(getByIdApiResponseFail(payload));
    toast.error(payload.message);
  }
};
// Add API Group
export const addplanAction = (formData) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${process.env.REACT_APP_Base_WEB_URL}/plan`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Created Successfully!");
      dispatch(createplanResponseSuccess({ status, data }));
    } else {
      dispatch(createplanResponseFail({ status: 400 }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(createplanResponseFail(payload));
    toast.error(payload.message);
  }
};

// Update API Group
export const updateplanAction = (id, formData) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${process.env.REACT_APP_Base_WEB_URL}/plan/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message, data } = res.data;
    if (status === "ok") {
      toast.success("Updated Successfully!");
      dispatch(editplanResponseSuccess({ status: "updated", data }));
    } else {
      dispatch(editplanResponseFail({ status: 400 }));
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(editplanResponseFail(payload));
    toast.error(payload.message);
  }
};

// Delete API Group
export const deleteplanAction = (id) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${process.env.REACT_APP_Base_WEB_URL}/plan/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      dispatch(deleteplanResponseSuccess({ id, status }));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(deleteplanResponseFail(payload));
    toast.error(payload.message);
  }
};
