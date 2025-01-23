import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const apiBatchingInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
  batchList: [],
  batchCount: 0,
};

export const apiResponseManagementSlice = createSlice({
  name: "api_Batching",
  initialState: apiBatchingInitialState,
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
    batchlistResponseSuccess: (state, action) => {
      state.loading = false;
      state.batchList = action.payload.data;
      state.status = action.payload.status;
      state.batchCount = action.payload.count;
    },
    batchlistResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    createAPIBatchingResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.count = state.data.length;
      state.batchList = [...state.batchList, action.payload.data]
    },
    createAPIBatchingResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    getByIdResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.dataById = action.payload.data;
      state.count = action.payload.count
    },
    getByIdResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    editAPIBatchingResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    editAPIBatchingResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    deleteAPIBatchingResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1;
    },
    deleteAPIBatchingResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  request,
  listResponseSuccess,
  listResponseFail,
  createAPIBatchingResponseSuccess,
  createAPIBatchingResponseFail,
  deleteAPIBatchingResponseSuccess,
  deleteAPIBatchingResponseFail,
  editAPIBatchingResponseFail,
  editAPIBatchingResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
  batchlistResponseSuccess,
  batchlistResponseFail,
} = apiResponseManagementSlice.actions;

export const apiReponseManagementReducer = apiResponseManagementSlice.reducer;

export const apiBatchingAction =
  (page = 1, limit = 5, searchQueries) =>
    async (dispatch) => {
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.get(
          `${backendAPIList.apiResponseManagement}?page=${page}&limit=${limit}&${searchQueries}`,
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
export const apiBatchClientAction =
  (page = 1, limit = 5, searchQueries) =>
    async (dispatch) => {
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.get(
          `${backendAPIList.apiResponseManagement}/client-batch?page=${page}&limit=${limit}&${searchQueries}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { status, data, count } = res.data;
        console.log(res.data, ">>>>>>")
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
export const retriggerBatchingAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${backendAPIList.apiResponseManagement}/retrigger/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      toast.success(message);
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
export const SkipPrevalidationAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${backendAPIList.apiResponseManagement}/skip-validation/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, message } = res.data;

    if (status === "ok") {
      toast.success(message);
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
export const batchListAction =
  (page, limit, searchQueries) => async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.apiResponseManagement}/batch?page=${page}&limit=${limit}&${searchQueries}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { status, data, count } = res.data;

      if (status === "ok") {
        dispatch(batchlistResponseSuccess({ data, status, count }));
      }
    } catch (error) {
      const payload = {
        message: error?.response?.data?.message || "An error occurred",
        status: error?.response?.status || 500,
      };
      dispatch(batchlistResponseFail(payload));
      toast.error(payload.message);
    }
  };
export const getByIdAPIAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(
      `${backendAPIList.apiResponseManagement}/${id}`,
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
    dispatch(listResponseFail(payload));
    toast.error(payload.message);
  }
};

export const getByIdClientDataAPIAction =
  (page, limit, searchQueries, id) =>
    async (dispatch) => {
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.get(
          `${backendAPIList.apiResponseManagement}/client-datas?page=${page}&limit=${limit}&${searchQueries}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { status, data, count } = res.data;

        if (status === "ok") {
          dispatch(getByIdResponseSuccess({ status, data, count }));
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
    export const addAPIFormBatchingAction = (formData, id) => async (dispatch) => {
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.post(
          `${backendAPIList.apiResponseManagement}/singlerequst`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
    
        const { status, message,data } = res.data;
        if (status === "ok") {
          toast.success(message);
          dispatch(createAPIBatchingResponseSuccess({ status: "done",data }));
        } else {
          dispatch(createAPIBatchingResponseFail({ status: 400 }));
        }
      } catch (error) {
        const payload = {
          message: error?.response?.data?.message || "An error occurred",
          status: error?.response?.status || 500,
        };
        dispatch(createAPIBatchingResponseFail(payload));
        toast.error(payload.message);
      }
    };
export const addAPIBatchingAction = (formData, id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.post(
      `${backendAPIList.apiResponseManagement}/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message,data } = res.data;
    if (status === "ok") {
      toast.success(message);
      dispatch(createAPIBatchingResponseSuccess({ status: "done",data }));
    } else {
      dispatch(createAPIBatchingResponseFail({ status: 400 }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(createAPIBatchingResponseFail(payload));
    toast.error(payload.message);
  }
};
export const uploadCSVAPIBatchingAction =
  (formData) => async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.post(
        `${backendAPIList.apiResponseManagement}/csvfilerequest`,
        formData.formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { status, message,data } = res.data;
      if (status === "ok") {
        toast.success(message);
        dispatch(createAPIBatchingResponseSuccess({ status: "uploaded", data}));
      } else {
        dispatch(createAPIBatchingResponseFail({ status: 400 }));
      }
    } catch (error) {
      const payload = {
        message: error?.response?.data?.message || "An error occurred",
        status: error?.response?.status || 500,
      };
      dispatch(createAPIBatchingResponseFail(payload));
      toast.error(payload.message);
    }
  };
export const uploadCSVFileAPIBatchingAction =
  (formData) => async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.post(
        `${backendAPIList.apiResponseManagement}/upload/${formData.apiGroupId}`,
        formData.formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { status, message,data } = res.data;
      if (status === "ok") {
        toast.success(message);
        dispatch(createAPIBatchingResponseSuccess({ status: "uploaded", data}));
      } else {
        dispatch(createAPIBatchingResponseFail({ status: 400 }));
      }
    } catch (error) {
      const payload = {
        message: error?.response?.data?.message || "An error occurred",
        status: error?.response?.status || 500,
      };
      dispatch(createAPIBatchingResponseFail(payload));
      toast.error(payload.message);
    }
  };

export const updateAPIBatchingAction = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.apiResponseManagement}/${id}`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message, data } = res.data;
    if (status === "ok") {
      toast.success("Updated Successfully!");
      dispatch(editAPIBatchingResponseSuccess({ status, data }));
    } else {
      dispatch(editAPIBatchingResponseFail({ status: 400 }));
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(editAPIBatchingResponseFail(payload));
    toast.error(payload.message);
  }
};

export const deleteAPIBatchingAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${backendAPIList.apiResponseManagement}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      dispatch(deleteAPIBatchingResponseSuccess({ id, status }));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(deleteAPIBatchingResponseFail(payload));
    toast.error(payload.message);
  }
};
