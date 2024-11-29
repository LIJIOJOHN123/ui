import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";

const transactionInitialState = {
  loading: false,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// Transaction slice
export const transactionSlice = createSlice({
  name: "transaction",
  initialState: transactionInitialState,
  reducers: {
    // List
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
    // Update
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

// Fetch Transaction List
export const transactionListAction =
  (page = 1, limit = 5, searchQueries) =>
  async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${process.env.REACT_APP_Base_URL}/transaction?page=${page}&limit=${limit}&${searchQueries}`,
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

// Fetch Transaction By ID
export const getByIdTransactionAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_URL}/transaction/${id}`,
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

// Update Transaction
export const updateTransactionAction = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.patch(
      `${process.env.REACT_APP_Base_URL}/transaction/${id}`,
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














