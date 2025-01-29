import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorage } from "../utils/LocalStorage";
import backendAPIList from "../services/apiList";

const WrmReportInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
  reportList:[],
  reportCount:0
};

export const wrmReportSlice = createSlice({
  name: "wrmreport",
  initialState: WrmReportInitialState,
  reducers: {
    wrmReportExportSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.status = action.payload.status;
      state.count = action.payload.count;
    },
    wrmReportListtSuccess: (state, action) => {
      state.loading = false;
      state.reportList = action.payload.data;
      state.status = action.payload.status;
      state.reportCount = action.payload.count;
    },
    wrmReportExportFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    wrmReportListFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    }
  },
});

export const {
  wrmReportExportSuccess,
  wrmReportExportFail,
  wrmReportListFail,
  wrmReportListtSuccess
} = wrmReportSlice.actions;

export const wrmReportReducer = wrmReportSlice.reducer;

export const wrmReportExportAction =
  (batchId) =>
  async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.wrmReportManagement}/export/${batchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { status, data, count } = res.data;
      if (status === "ok") {
        dispatch(wrmReportExportSuccess({ data, status, count }));
      }
    } catch (error) {
      const payload = {
        message: error?.response?.data?.message || "An error occurred",
        status: error?.response?.status || 500,
      };
      dispatch(wrmReportExportFail(payload));
      toast.error(payload.message);
    }
  };

  export const wrmReportListAction =
  (page, limit, searchQueries) =>
  async (dispatch) => {
    try {
      const token = getLocalStorage("authToken");
      const res = await axios.get(
        `${backendAPIList.wrmReportManagement}?page=${page}&limit=${limit}&${searchQueries}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { status, data, count } = res.data;
      if (status === "ok") {
        dispatch(wrmReportListtSuccess({ data, status, count }));
      }
    } catch (error) {
      const payload = {
        message: error?.response?.data?.message || "An error occurred",
        status: error?.response?.status || 500,
      };
      dispatch(wrmReportListFail(payload));
      toast.error(payload.message);
    }
  };
