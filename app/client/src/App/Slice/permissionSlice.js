import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPermissions, updateUserPermission } from "../Services/permissionService";

// Thunks

// Fetch permissions
export const get_permissions = createAsyncThunk(
    "permissions/get_permissions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getPermissions();
            return response; // The response could be permissions data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update user permissions
export const update_permission = createAsyncThunk(
    "permissions/update_permission",
    async (data, { rejectWithValue }) => {
        try {
            const response = await updateUserPermission(data);
            return response; // The response could be updated permission data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Slice
const permissionSlice = createSlice({
    name: "permissions",
    initialState: {
        loading: false,
        permissions: null, // Store fetched permissions
        error: null, // Store error messages
        updateSuccess: false, // Track update success
    },
    reducers: {
        resetUpdateSuccess: (state) => {
            state.updateSuccess = false; // Reset the update success state
        }
    },
    extraReducers: (builder) => {
        // Handle get_permissions
        builder
            .addCase(get_permissions.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error when a new request is made
            })
            .addCase(get_permissions.fulfilled, (state, action) => {
                state.loading = false;
                state.permissions = action.payload; // Store permissions in state
            })
            .addCase(get_permissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching permissions";
            });

        // Handle update_permission
        builder
            .addCase(update_permission.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.updateSuccess = false; // Reset success state when a new update starts
            })
            .addCase(update_permission.fulfilled, (state, action) => {
                state.loading = false;
                state.updateSuccess = true; // Indicate that the update was successful
                // Optionally update state.permissions if needed with updated permission
            })
            .addCase(update_permission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error updating permission";
                state.updateSuccess = false; // Set success to false if the update failed
            });
    },
});

// Export the resetUpdateSuccess action
export const { resetUpdateSuccess } = permissionSlice.actions;

// Selectors
export const selectPermissions = (state) => state.Permission.permissions;
export const selectLoading = (state) => state.Permission.loading;
export const selectError = (state) => state.Permission.error;
export const selectUpdateSuccess = (state) => state.Permission.updateSuccess;

export default permissionSlice.reducer;
