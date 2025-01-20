import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const postValidationInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

export const postValidationSlice = createSlice({
  name: "postValidation",
  initialState: postValidationInitialState,
  reducers: {
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
    createPostValidationSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data]; 
      state.count = state.data.length;
    },
    createPostValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    getPostValidationByIdSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.dataById = action.payload.data; 
    },
    getPostValidationByIdFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
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
    deletePostValidationSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1; 
    },
    deletePostValidationFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

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
