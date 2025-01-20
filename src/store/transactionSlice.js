import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const transactionInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: transactionInitialState,
  reducers: {
    transactionActionResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    transactionResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    getByIdTransactionResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.dataById = action.payload.data;
    },
    getByIdTransactionResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    updateTransactionResponseSuccess: (state, action) => {
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
    updateTransactionResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  transactionActionResponseSuccess,
  transactionResponseFail,
  getByIdTransactionResponseSuccess,
  getByIdTransactionResponseFail,
  updateTransactionResponseSuccess,
  updateTransactionResponseFail,
} = transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;

export const transactionListAction =
  (page = 1, limit = 5, searchQueries) =>
  async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.transactionManagement}?page=${page}&limit=${limit}&${searchQueries}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { status, data, count } = res.data;
      if (status === "ok") {
        dispatch(transactionActionResponseSuccess({ data, status, count }));
      }
    } catch (error) {
      const payload = {
        message: error?.response?.data?.message || "An error occurred",
        status: error?.response?.status || 500,
      };
      dispatch(transactionResponseFail(payload));
      toast.error(payload.message);
    }
  };

export const getByIdTransactionAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${backendAPIList.transactionManagement}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, data } = res.data;

    if (status === "ok") {
      dispatch(getByIdTransactionResponseSuccess({ status, data }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(getByIdTransactionResponseFail(payload));
    toast.error(payload.message);
  }
};

export const updateTransactionAction = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.patch(
      `${backendAPIList.transactionManagement}/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, message, data } = res.data;
    if (status === "ok") {
      toast.success("Updated Successfully!");
      dispatch(updateTransactionResponseSuccess({ status, data }));
    } else {
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(updateTransactionResponseFail(payload));
    toast.error(payload.message);
  }
};














