import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUser, getUser, getUserByID } from "../Services/userService";

// Thunks
export const add_user = createAsyncThunk(
    "add_user",
    async (data, { rejectWithValue }) => {
        try {
            return await addUser(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
// Thunks
export const get_user = createAsyncThunk(
    "get_user",
    async (_, { rejectWithValue }) => {
        try {
            let res = await getUser();
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const get_user_by_id = createAsyncThunk(
    "get_user_by_id",
    async (id, { rejectWithValue }) => {
        try {
            let res = await getUserByID(id);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
        users: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Add user cases
            .addCase(add_user.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(add_user.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(add_user.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(get_user.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_user.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload
            })
            .addCase(get_user.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(get_user_by_id.pending, (state) => {
                state.error = null;
            })
            .addCase(get_user_by_id.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(get_user_by_id.rejected, (state, action) => {
                state.error = action.payload;
            })
    },
});

export default userSlice.reducer;
