import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const apiListInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
  page: 1,
  search: "",
  limit: 50
};

export const clientManagementSlice = createSlice({
  name: "clientManagement",
  initialState: apiListInitialState,
  reducers: {
    clientManagementActionResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    clientManagementResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
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
      }
      state.loading = false;
      state.status = action.payload.status;
    },

    updateResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  clientManagementActionResponseSuccess,
  clientManagementResponseFail,
  createResponseSuccess,
  createResponseFail,
  updateResponseFail,
  updateResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
} = clientManagementSlice.actions;

export const clientManagementReducer = clientManagementSlice.reducer;

export const clientManagementListAction =
  (page = 1, limit, searchQueries) =>
    async (dispatch) => {
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.get(
          `${backendAPIList.clientManagement}/clients?page=${page}&limit=${limit}&${searchQueries}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { status, data, count } = res.data;
        if (status === "ok") {
          dispatch(
            clientManagementActionResponseSuccess({ data, status, count })
          );
        }
      } catch (error) {
        const payload = {
          message: error?.response?.data?.message || "An error occurred",
          status: error?.response?.status || 500,
        };
        dispatch(clientManagementResponseFail(payload));
        toast.error(payload.message);
      }
    };
export const clientDetailsListAction =
  (id, page = 1, limit, searchQueries) =>
    async (dispatch) => {
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.get(
          `${backendAPIList.paymentManagement}/client-details/${id}?page=${page}&limit=${limit}&${searchQueries}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { status, data, count } = res.data;

        if (status === "ok") {
          dispatch(
            clientManagementActionResponseSuccess({ data, status, count })
          );
        }
      } catch (error) {
        const payload = {
          message: error?.response?.data?.message || "An error occurred",
          status: error?.response?.status || 500,
        };
        dispatch(clientManagementResponseFail(payload));
        toast.error(payload.message);
      }
    };
export const editClientDetailsAction =
  (id, formData, page = 1, limit, searchQueries) =>
    async (dispatch) => {
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.put(
          `${backendAPIList.paymentManagement}/client-details/${id}?page=${page}&limit=${limit}&${searchQueries}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { status, data, count } = res.data;

        if (status === "ok") {
          dispatch(
            clientManagementActionResponseSuccess({ data, status, count })
          );
        }
      } catch (error) {
        const payload = {
          message: error?.response?.data?.message || "An error occurred",
          status: error?.response?.status || 500,
        };
        dispatch(clientManagementResponseFail(payload));
        toast.error(payload.message);
      }
    };
export const editActivePaymentDetailsAction =
  (id, formData, page = 1, limit, searchQueries) =>
    async (dispatch) => {
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.put(
          `${backendAPIList.paymentManagement}/payment-details/${id}?page=${page}&limit=${limit}&${searchQueries}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { status, data, count } = res.data;

        if (status === "ok") {
          dispatch(
            clientManagementActionResponseSuccess({ data, status, count })
          );
        }
      } catch (error) {
        const payload = {
          message: error?.response?.data?.message || "An error occurred",
          status: error?.response?.status || 500,
        };
        dispatch(clientManagementResponseFail(payload));
        toast.error(payload.message);
      }
    };
export const getByIdClientAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${backendAPIList.clientManagement}/client/${id}`,
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
    dispatch(getByIdResponseFail(payload));
    toast.error(payload.message);
  }
};

export const updateClientAction = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.patch(
      `${backendAPIList.clientManagement}/client/${id}`,
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
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(updateResponseFail(payload));
    toast.error(payload.message);
  }
};
