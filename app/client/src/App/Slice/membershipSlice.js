import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMemberShip, getMemberShip, getMemberShipById, importMembership, updateMembership } from "../Services/memberShipService";

// Thunks
export const add_MemberShip = createAsyncThunk(
    "addMemberShip",
    async (data, { rejectWithValue }) => {
        try {
            return await addMemberShip(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const ImportMembership = createAsyncThunk(
    "importMembership",
    async (data, { rejectWithValue }) => {
        try {
            return await importMembership(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


// updateMembership
export const updateMembershipThunk = createAsyncThunk(
    "updateMembershipThunk",
    async (data, { rejectWithValue }) => {
        try {
            return await updateMembership(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const get_MemberShip = createAsyncThunk(
    "getMemberShip",
    async (data, { rejectWithValue }) => {
        try {
            return await getMemberShip();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const get_MemberShip_byId = createAsyncThunk(
    "get_MemberShip_byId",
    async (id, { rejectWithValue }) => {
        try {
            return await getMemberShipById(id);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// getOwners


const ownerSlice = createSlice({
    name: "membership",
    initialState: {
        membership: null,
        // singleMembership: null,
        loading: {
            membership: false,
            memberships: false
        },
        memberships: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Add user cases
            .addCase(ImportMembership.pending, (state) => {
                state.loading.membership = true;
                state.error = null;
            })
            .addCase(ImportMembership.fulfilled, (state, action) => {
                state.loading.membership = false;
            })
            .addCase(ImportMembership.rejected, (state, action) => {
                state.loading.membership = false;
                state.error = action.payload;
            })
            .addCase(updateMembershipThunk.pending, (state) => {
                state.loading.membership = true;
                state.error = null;
            })
            .addCase(updateMembershipThunk.fulfilled, (state, action) => {
                state.loading.membership = false;
            })
            .addCase(updateMembershipThunk.rejected, (state, action) => {
                state.loading.membership = false;
            })
            .addCase(add_MemberShip.pending, (state) => {
                state.loading.membership = true;
                state.error = null;
            })
            .addCase(add_MemberShip.fulfilled, (state, action) => {
                state.loading.membership = false;
            })
            .addCase(add_MemberShip.rejected, (state, action) => {
                state.loading.membership = false;
                state.error = action.payload;
            })
            // GEt user cases
            .addCase(get_MemberShip.pending, (state) => {
                state.loading.memberships = true;
                state.error = null;
            })
            .addCase(get_MemberShip.fulfilled, (state, action) => {
                state.loading.memberships = false;
                state.memberships = action.payload;
            })
            .addCase(get_MemberShip.rejected, (state, action) => {
                state.loading.memberships = false;
                state.error = action.payload;
            })
            // GEt user cases
            .addCase(get_MemberShip_byId.pending, (state) => {
                state.loading.membership = true;
                state.error = null;
            })
            .addCase(get_MemberShip_byId.fulfilled, (state, action) => {
                state.loading.membership = false;
                state.membership = action.payload;
            })
            .addCase(get_MemberShip_byId.rejected, (state, action) => {
                state.loading.membership = false;
                state.error = action.payload;
            })
    },
});

export default ownerSlice.reducer;
