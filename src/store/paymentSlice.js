import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/Background_Black.png";
import backendAPIList from "../services/apiList";
import { getLocalStorage } from "../utils/LocalStorage";
const paymentInitialState = {
  loading: true,
  data: [],
  status: null,
  count: null,
  dataById: {},
  page: 1,
  search: "",
  limit: 5,
};

export const paymentSlice = createSlice({
  name: "payment_management",
  initialState: paymentInitialState,
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
    createResponseSuccess: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.data = [action.payload.data, ...state.data];
      state.count = state.data.length;
    },

    createResponseFail: (state, action) => {
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
    updateResponseSuccess: (state, action) => {
      state.dataById = action.payload.data;
      state.loading = false;
      state.status = action.payload.status;
    },

    updateResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    deleteResponseSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((item) => item._id !== action.payload.id);
      state.status = action.payload.status;
      state.count -= 1;
    },
    deleteResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
    verifyResponseSuccess: (state, action) => {
      const index = state.data.findIndex(
        (item) => item._id === action.payload.data._id
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload.data };
      }
      state.loading = false;
      state.status = action.payload.status;
    },
    verifyResponseFail: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
    },
  },
});

export const {
  listResponseSuccess,
  listResponseFail,
  createResponseSuccess,
  createResponseFail,
  deleteResponseSuccess,
  deleteResponseFail,
  updateResponseFail,
  updateResponseSuccess,
  getByIdResponseFail,
  getByIdResponseSuccess,
  verifyResponseFail,
  verifyResponseSuccess,
} = paymentSlice.actions;

export const paymentReducer = paymentSlice.reducer;

export const paymentListAction =
  (page = 1, limit = 5, searchQueries) =>
    async (dispatch) => {
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.get(
          `${backendAPIList.paymentManagement}?page=${page}&limit=${limit}&${searchQueries}`,
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
export const darsbordChartListAction =
  (formData, page = 1, limit = 5, searchQueries) =>
    async (dispatch) => {
      console.log(formData, "formData")
      try {
        const token = getLocalStorage("authToken");
        const res = await axios.post(
          `${backendAPIList.paymentManagement}/chart?page=${page}&limit=${limit}&${searchQueries}`,
          formData,
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

export const getByIdPaymentAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.get(`${backendAPIList.paymentManagement}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

export const addPaymentAction = (id, formData, user) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    if (!token) {
      toast.error("Authentication token not found");
      return;
    }

    const res = await axios.post(
      `${backendAPIList.paymentManagement}/${id}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { status, data: order, message } = res.data;
    if (order && typeof order === 'object') {
      const initializeRazorpay = (order) => {
        const options = {
          key: "rzp_test_Bl53qIogikLddf",
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          image: logo,
          name: "Valid X",
          notes: {
            address: "Ranjith Corporate Office",
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone ?? "",
          },
          theme: { color: "#3399cc" },
          handler: async (response) => {
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            try {
              const res = await axios.put(
                `${backendAPIList.paymentManagement}/verify-payment`,
                verificationData,
                {
                  headers: {
                    Authorization: `Bearer ${getLocalStorage("authToken")}`,
                  },
                }
              );

              const { status, data } = res.data;
              if (status === "ok") {
                toast.success("Plan purchased successfully!");
                dispatch(updateResponseSuccess({ status, data }));
              } else {
                dispatch(updateResponseFail({ status, data }));
                toast.error("Payment success, but failed to update status.");
              }
            } catch (error) {
              console.error("Error updating payment status:", error);
              toast.error(
                "Failed to update payment status. Please contact support."
              );
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
          console.error("Payment Failed:", response.error);
          toast.error("Payment Failed!");
        });
        rzp.open();
      };
      toast.success(message);
      order.amount && initializeRazorpay(order);

    } else {
      toast.error(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(updateResponseFail(payload.status));
    toast.error(payload.message);
  }
};

export const verifyPaymentAction = (formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.paymentManagement}/verify-payment`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { status, data } = res.data;
    if (status === "ok") {
      toast.success("Verified Successfully!");
      dispatch(verifyResponseSuccess({ status, data }));
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(verifyResponseFail(payload));
    toast.error(payload.message);
  }
};

export const updatePaymentAction = (id, formData) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.put(
      `${backendAPIList.paymentManagement}/${id}`,
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
      dispatch(updateResponseFail({ status: 400 }));
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

export const deletePaymentAction = (id) => async (dispatch) => {
  try {
    const token = getLocalStorage("authToken");
    const res = await axios.delete(
      `${backendAPIList.paymentManagement}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const { status, message } = res.data;
    if (status === "ok") {
      dispatch(deleteResponseSuccess({ id, status }));
      toast.success(message);
    }
  } catch (error) {
    const payload = {
      message: error?.response?.data?.message || "An error occurred",
      status: error?.response?.status || 500,
    };
    dispatch(deleteResponseFail(payload));
    toast.error(payload.message);
  }
};
