import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

// Updated initial state
const postValidationInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// PostValidation slice
export const postValidationSlice = createSlice({
  name: "postValidation",
  initialState: postValidationInitialState,
  reducers: {
    // List PostValidations
    listPostValidationsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    listPostValidationsFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Add PostValidation
    createPostValidationSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data]; // Add the new postValidation to the list
      state.count = state.data.length;
    },
    createPostValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Get PostValidation By ID
    getPostValidationByIdSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.dataById = action.payload.data; // Populate with the fetched postValidation data
    },
    getPostValidationByIdFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Update PostValidation
    updatePostValidationSuccess: (state, action) => {
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
    updatePostValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Delete PostValidation
    deletePostValidationSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1; // Update the count after deletion
    },
    deletePostValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

// Export actions and reducer
export const {
  listPostValidationsSuccess,
  listPostValidationsFail,
  createPostValidationSuccess,
  createPostValidationFail,
  getPostValidationByIdSuccess,
  getPostValidationByIdFail,
  updatePostValidationSuccess,
  updatePostValidationFail,
  deletePostValidationSuccess,
  deletePostValidationFail,
} = postValidationSlice.actions;

export const postValidationReducer = postValidationSlice.reducer;

// API Actions

// Fetch all postValidations
export const fetchPostValidations =
  (page = 1, limit = 5, searchQueries) =>
  async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.postValidations}?page=${page}&limit=${limit}&${searchQueries}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { status, data, count } = res.data;
      if (status === "ok") {
        dispatch(listPostValidationsSuccess({ data, status, count }));
      }
    } catch (error) {
      dispatch(
        listPostValidationsFail({
          status: error?.response?.status || 500,
          message: error?.response?.data?.message || "An error occurred",
        })
      );
      toast.error("Failed to fetch post validations.");
    }
  };

// Fetch postValidation by ID
export const fetchPostValidationById = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(`${backendAPIList.postValidations}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { status, data } = res.data;
    if (status === "ok") {
      dispatch(getPostValidationByIdSuccess({ status, data }));
    }
  } catch (error) {
    dispatch(
      getPostValidationByIdFail({
        status: error?.response?.status || 500,
        message: error?.response?.data?.message || "An error occurred",
      })
    );
    toast.error("Failed to fetch post validation.");
  }
};

// Add a new postValidation
export const addPostValidation = (formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${backendAPIList.postValidations}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Post validation added successfully.");
      dispatch(createPostValidationSuccess({ status, data }));
    }
  } catch (error) {
    dispatch(
      createPostValidationFail({
        status: error?.response?.status || 500,
        message: error?.response?.data?.message || "An error occurred",
      })
    );
    toast.error("Failed to add post validation.");
  }
};

// Update postValidation
export const updatePostValidation = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.postValidations}/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Post validation updated successfully.");
      dispatch(updatePostValidationSuccess({ status, data }));
    }
  } catch (error) {
    dispatch(
      updatePostValidationFail({
        status: error?.response?.status || 500,
        message: error?.response?.data?.message || "An error occurred",
      })
    );
    toast.error("Failed to update post validation.");
  }
};

// Delete postValidation
export const deletePostValidation = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.delete(`${backendAPIList.postValidations}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { status } = res.data;
    if (status === "ok") {
      toast.success("Post validation deleted successfully.");
      dispatch(deletePostValidationSuccess({ id, status }));
    }
  } catch (error) {
    dispatch(
      deletePostValidationFail({
        status: error?.response?.status || 500,
        message: error?.response?.data?.message || "An error occurred",
      })
    );
    toast.error("Failed to delete post validation.");
  }
};
