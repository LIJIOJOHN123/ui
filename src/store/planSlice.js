import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const planInitialState = {
  loading: false,
  data: [],
  status: null,
  count: null,
  dataById: {},
  apiListDetails: [],
};

export const planSlice = createSlice({
  name: "plan",
  initialState: planInitialState,
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
    editplanResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },

    editplanResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
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

export const planAction =
  (page = 1, limit = 5, searchQueries) =>
  async (dispatch) => {
    try {
      dispatch(request());
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.planManagement}?page=${page}&limit=${limit}&${searchQueries}`,
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

export const getByIdPlanAction = (id) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${backendAPIList.planManagement}/${id}`,
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
      `${backendAPIList.planManagement}/category-apilist/${id}`,
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
export const addplanAction = (formData) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${backendAPIList.planManagement}`,
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

export const updateplanAction = (id, formData) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.planManagement}/${id}`,
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

export const deleteplanAction = (id) => async (dispatch) => {
  try {
    dispatch(request());
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${backendAPIList.planManagement}/${id}`,
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
