import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

//create new order
export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/create",
      orderData
    );

    return response.data;
  }
);

// const shoppingOrderSlice = createSlice({
//   name: "shoppingOrderSlice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createNewOrder.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createNewOrder.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.approvalURL = action.payload.approvalURL;
//         state.orderId = action.payload.orderId;
//         // sessionStorage.setItem(
//         //   "currentOrderId",
//         //   JSON.stringify(action.payload.orderId)
//         // );
//       })
//       .addCase(createNewOrder.rejected, (state) => {
//         state.isLoading = false;
//         state.approvalURL = null;
//         state.orderId = null;
//       });
//   },
// });

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
