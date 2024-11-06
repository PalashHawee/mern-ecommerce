import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress", // Action type
  async (formData) => {
    // Perform API call to add new address
    const response = await axios.post(
      "http://localhost:5000/api/shop/address/add",
      formData
    );
    return response.data; // Return the data to be used in the fulfilled action
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses", // Action type
  async (userId) => {
    // Perform API call to add new address
    const response = await axios.get(
      `http://localhost:5000/api/shop/address/get/${userId}`
    );
    return response.data; // Return the data to be used in the fulfilled action
  }
);

export const editAddress = createAsyncThunk(
  "/addresses/editAddress", // Action type
  async (userId, addressId, formData) => {
    // Perform API call to add new address
    const response = await axios.put(
      `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data; // Return the data to be used in the fulfilled action
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress", // Action type
  async (userId, addressId) => {
    // Perform API call to add new address
    const response = await axios.delete(
      `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data; // Return the data to be used in the fulfilled action
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
