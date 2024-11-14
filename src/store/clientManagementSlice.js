import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";

const apiListInitialState = {
  loading: false,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// Get ALL apiList slice
export const clientManagementSlice = createSlice({
  name: "clientManagement",
  initialState: apiListInitialState,
  reducers: {
    // List
    clientManagementActionResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data.result;
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
    // edit
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
  request,
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

// Fetch API List
export const clientManagementListAction = () => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_URL}/user/clients`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, data, count } = res.data;
    if (status === "ok") {
      dispatch(clientManagementActionResponseSuccess({ data, status, count }));
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
// Fetch API By ID
export const getByIdClientAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_Base_URL}/user/client/${id}`,
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


// update API
export const updateClientAction = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.patch(
      `${process.env.REACT_APP_Base_URL}/user/client/${id}`,
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
    dispatch(createResponseFail(payload));
    toast.error(payload.message);
  }
};

