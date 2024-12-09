import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const productInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
};

// Create API Group slice
export const productSlice = createSlice({
  name: "product_management",
  initialState: productInitialState,
  reducers: {
    // List
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
    // Add
    createproductResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data];
      state.count = state.data.length;
    },
    createAPIGroupResponseFail: (state, action) => {
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
    // Edit
    editproductResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },

    editproductResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    // Delete
    deleteAPIGroupResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1;
    },
    deleteAPIGroupResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  request,
  listResponseSuccess,
  listResponseFail,
  createproductResponseSuccess,
  createproductResponseFail,
  deleteproductResponseSuccess,
  deleteproductResponseFail,
  editproductResponseFail,
  editproductResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
} = productSlice.actions;

export const productReducer = productSlice.reducer;

// Fetch API Group List
export const productAction =
  (page, limit, searchQueries) =>
  async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.productManagement}?page=${page}&limit=${limit}&${searchQueries}`,
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

// Fetch API By ID
export const getByIdAPIAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(`${backendAPIList.productManagement}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { status, data } = res.data;
    console.log(status,data)
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
// Add API Group
export const addproductAction = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${backendAPIList.productManagement}/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Created Successfully!");
      dispatch(createproductResponseSuccess({ status, data }));
    } else {
      dispatch(createproductResponseFail({ status: 400 }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(createproductResponseFail(payload));
    toast.error(payload.message);
  }
};

// Update API Group
export const updateproductAction = (id, formData) => async (dispatch) => {
  try {
    console.log(id, formData, "id, formData");
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.productManagement}/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message, data } = res.data;
    console.log(res.data, "res.data");
    if (status === "ok") {
      toast.success("Updated Successfully!");
      dispatch(editproductResponseSuccess({ status, data }));
    } else {
      dispatch(editproductResponseFail({ status: 400 }));
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(editproductResponseFail(payload));
    toast.error(payload.message);
  }
};

// Delete API Group
export const deleteproductAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${backendAPIList.productManagement}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      dispatch(deleteproductResponseSuccess({ id, status }));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(deleteproductResponseFail(payload));
    toast.error(payload.message);
  }
};
