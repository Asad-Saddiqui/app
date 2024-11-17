import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOwner, getOwners, updateOwners } from "../Services/ownerService";

// Thunks
export const add_owner = createAsyncThunk(
    "add_user",
    async (data, { rejectWithValue }) => {
        try {
            return await addOwner(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const get_Owners = createAsyncThunk(
    "get_Owners",
    async (data, { rejectWithValue }) => {
        try {
            return await getOwners();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const update_Owners = createAsyncThunk(
    "update_Owners",
    async (data, { rejectWithValue }) => {
        try {
            return await updateOwners(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// getOwners


const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        owner: null,

        loading: {
            owner: false,
            owners: false
        },
        owners: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_owner.pending, (state) => {
                state.loading.owner = true;
                state.error = null;
            })
            .addCase(add_owner.fulfilled, (state, action) => {
                state.loading.owner = false;
            })
            .addCase(add_owner.rejected, (state, action) => {
                state.loading.owner = false;
                state.error = action.payload;
            })

            .addCase(update_Owners.pending, (state) => {
                state.loading.owner = true;
                state.error = null;
            })
            .addCase(update_Owners.fulfilled, (state, action) => {
                state.loading.owner = false;
            })
            .addCase(update_Owners.rejected, (state, action) => {
                state.loading.owner = false;
                state.error = action.payload;
            })


            .addCase(get_Owners.pending, (state) => {
                state.loading.owners = true;
                state.error = null;
            })
            .addCase(get_Owners.fulfilled, (state, action) => {
                state.loading.owners = false;
                state.owners = action.payload;
            })
            .addCase(get_Owners.rejected, (state, action) => {
                state.loading.owners = false;
                state.error = action.payload;
            })

    },
});

export default ownerSlice.reducer;
