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
  page: 1,
  search: "",
  limit: 2,
};

export const apiMangementSlice = createSlice({
  name: "api_management",
  initialState: apiMangementIntiaiState,
  reducers: {
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
    createResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data]; 
      state.count = state.data.length; 
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

export const apiListAction =
  (page, limit, searchQueries) =>
  async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.apiManagement}?page=${page}&limit=${limit}&${searchQueries}`,
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
export const getByIdAPIAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(`${backendAPIList.apiManagement}/${id}`, {
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

export const addApiGroupAction = (formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.post(`${backendAPIList.apiManagement}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Created Successfully!");
      dispatch(createResponseSuccess({ status, data }));
    } else {
      dispatch(createResponseFail({ status: 400 }));
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
export const deleteApiAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.delete(`${backendAPIList.apiManagement}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
