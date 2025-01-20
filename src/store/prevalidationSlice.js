import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const validationManagementInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

export const validationManagementSlice = createSlice({
  name: "validation_management",
  initialState: validationManagementInitialState,
  reducers: {
    listValidationsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    listValidationsFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    createValidationSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data];
      state.count = state.data.length;
    },
    createValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    getValidationByIdSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.dataById = action.payload.data; 
    },
    getValidationByIdFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    updateValidationSuccess: (state, action) => {
      const index = state.data.findIndex(
        (item) => item._id === action.payload.data._id
      );
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload.data,
        };
      }
      state.loading = false;
      state.status = action.payload.status;
    },
    updateValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    deleteValidationSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1; 
    },
    deleteValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  listValidationsSuccess,
  listValidationsFail,
  createValidationSuccess,
  createValidationFail,
  getValidationByIdSuccess,
  getValidationByIdFail,
  updateValidationSuccess,
  updateValidationFail,
  deleteValidationSuccess,
  deleteValidationFail,
} = validationManagementSlice.actions;

export const validationReducer = validationManagementSlice.reducer;


export const fetchValidations =
  (page = 1, limit = 5, searchQueries) =>
  async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.validations}?page=${page}&limit=${limit}&${searchQueries}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { status, data, count } = res.data;
      if (status === "ok") {
        dispatch(listValidationsSuccess({ data, status, count }));
      }
    } catch (error) {
      dispatch(
        listValidationsFail({
          status: error?.response?.status || 500,
          message: error?.response?.data?.message || "An error occurred",
        })
      );
      toast.error("Failed to fetch validations.");
    }
  };

export const fetchValidationById = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(`${backendAPIList.validations}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { status, data } = res.data;
    if (status === "ok") {
      dispatch(getValidationByIdSuccess({ status, data }));
    }
  } catch (error) {
    dispatch(
      getValidationByIdFail({
        status: error?.response?.status || 500,
        message: error?.response?.data?.message || "An error occurred",
      })
    );
    toast.error("Failed to fetch validation.");
  }
};

export const addValidation = (formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.post(`${backendAPIList.validations}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Validation added successfully.");
      dispatch(createValidationSuccess({ status, data }));
    }
  } catch (error) {
    dispatch(
      createValidationFail({
        status: error?.response?.status || 500,
        message: error?.response?.data?.message || "An error occurred",
      })
    );
    toast.error("Failed to add validation.");
  }
};

export const updateValidation = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.validations}/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Validation updated successfully.");
      dispatch(updateValidationSuccess({ status, data }));
    }
  } catch (error) {
    dispatch(
      updateValidationFail({
        status: error?.response?.status || 500,
        message: error?.response?.data?.message || "An error occurred",
      })
    );
    toast.error("Failed to update validation.");
  }
};

export const deleteValidation = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.delete(`${backendAPIList.validations}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { status } = res.data;
    if (status === "ok") {
      toast.success("Validation deleted successfully.");
      dispatch(deleteValidationSuccess({ id, status }));
    }
  } catch (error) {
    dispatch(
      deleteValidationFail({
        status: error?.response?.status || 500,
        message: error?.response?.data?.message || "An error occurred",
      })
    );
    toast.error("Failed to delete validation.");
  }
};
