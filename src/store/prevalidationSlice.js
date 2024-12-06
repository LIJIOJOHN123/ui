import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

// Updated initial state
const validationManagementInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// Validation slice
export const validationManagementSlice = createSlice({
  name: "validation_management",
  initialState: validationManagementInitialState,
  reducers: {
    // List Validations
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
    // Add Validation
    createValidationSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data]; // Add the new validation to the list
      state.count = state.data.length;
    },
    createValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Get Validation By ID
    getValidationByIdSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.dataById = action.payload.data; // Populate with the fetched validation data
    },
    getValidationByIdFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Update Validation
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
    // Delete Validation
    deleteValidationSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1; // Update the count after deletion
    },
    deleteValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

// Export actions and reducer
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

// API Actions

// Fetch all validations
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

// Fetch validation by ID
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

// Add a new validation
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

// Update validation
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

// Delete validation
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
