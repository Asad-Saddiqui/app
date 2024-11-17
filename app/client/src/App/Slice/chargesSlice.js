// src/redux/chargesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCharges, getCharges, receivePayment } from "../Services/chargesService";

// Thunks
export const add_Charges = createAsyncThunk(
    "charges/add_Charges",
    async (data, { rejectWithValue }) => {
        try {
            return await addCharges(data);
        } catch (error) {
            return rejectWithValue(error.message || "Failed to add charges");
        }
    }
);

export const get_Charges = createAsyncThunk(
    "charges/get_Charges",
    async (id, { rejectWithValue }) => {
        try {
            return await getCharges(id);
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch charges");
        }
    }
);

// New thunk for receiving payment
export const receive_Payment = createAsyncThunk(
    "charges/receive_Payment",
    async (paymentData, { rejectWithValue }) => {
        try {
            return await receivePayment(paymentData);
        } catch (error) {
            return rejectWithValue(error.message || "Failed to process payment");
        }
    }
);

const chargesSlice = createSlice({
    name: "charges",
    initialState: {
        charge: null,
        loading: {
            charge: false,
            charges: false,
            payment: false, // Loading state for payment
        },
        charges: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_Charges.pending, (state) => {
                state.loading.charge = true;
                state.error = null; // Clear previous errors
            })
            .addCase(add_Charges.fulfilled, (state, action) => {
                state.loading.charge = false;
                // Optionally add the new charge to the charges array if applicable
                // state.charges = [...state.charges, action.payload]; // Uncomment if you have an array of charges
            })
            .addCase(add_Charges.rejected, (state, action) => {
                state.loading.charge = false;
                state.error = action.payload; // Set the error message
            })
            .addCase(get_Charges.pending, (state) => {
                state.loading.charges = true;
                state.error = null; // Clear previous errors
            })
            .addCase(get_Charges.fulfilled, (state, action) => {
                state.loading.charges = false;
                state.charges = action.payload; // Update charges with fetched data
            })
            .addCase(get_Charges.rejected, (state, action) => {
                state.loading.charges = false;
                state.error = action.payload; // Set the error message
            })
            .addCase(receive_Payment.pending, (state) => {
                state.loading.payment = true;
                state.error = null; // Clear previous errors
            })
            .addCase(receive_Payment.fulfilled, (state, action) => {
                state.loading.payment = false;
                // Optionally handle successful payment here
                // e.g., update any necessary state or store payment info
            })
            .addCase(receive_Payment.rejected, (state, action) => {
                state.loading.payment = false;
                state.error = action.payload; // Set the error message
            });
    },
});

export default chargesSlice.reducer;
