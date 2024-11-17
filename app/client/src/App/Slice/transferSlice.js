import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { track_transfer_membership, UpdateMembershiptransferService, transfer_membership, track_transfer_membership_Complation, fetchTransferFile, application_form } from "../Services/transferService";

// Thunks
export const transferMembership = createAsyncThunk(
    "transfer_membership",
    async (data, { rejectWithValue }) => {
        try {
            return await transfer_membership(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const UpdateMembershiptransfer = createAsyncThunk(
    "UpdateMembershiptransfer",
    async (data, { rejectWithValue }) => {
        try {
            return await UpdateMembershiptransferService(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// 
export const tracktransferMembership = createAsyncThunk(
    "tracktransferMembership",
    async (data, { rejectWithValue }) => {
        try {
            return await track_transfer_membership(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const tracktransferMembershipComplation = createAsyncThunk(
    "tracktransferMembershipComplation",
    async (data, { rejectWithValue }) => {
        try {
            return await track_transfer_membership_Complation(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const FetchTransferFile = createAsyncThunk(
    "FetchTransferFile",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchTransferFile();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// 

// application_form

export const FetchApplicationForm = createAsyncThunk(
    "FetchApplicationForm",
    async (id, { rejectWithValue }) => {
        try {
            return await application_form(id);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// Slice
const transferSlice = createSlice({
    name: "block",
    initialState: {
        loading: false,
        transfer_file: null,
        error: null,
        application: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchTransferFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchTransferFile.fulfilled, (state, action) => {
                state.loading = false;
                state.transfer_file = action.payload.data
            })
            .addCase(FetchTransferFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UpdateMembershiptransfer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateMembershiptransfer.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(UpdateMembershiptransfer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(transferMembership.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(transferMembership.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(transferMembership.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(tracktransferMembership.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(tracktransferMembership.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(tracktransferMembership.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(FetchApplicationForm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(FetchApplicationForm.fulfilled, (state, action) => {
                state.loading = false;
                state.application = action.payload;
            })
            .addCase(FetchApplicationForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default transferSlice.reducer;
