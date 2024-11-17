import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addBlock, DeleteBlockByID, getBlockByID, getBlocks, getBlocksByPhase, updateBlockByID } from "../Services/blockService";

// Thunks
export const add_block = createAsyncThunk(
    "add_block",
    async (data, { rejectWithValue }) => {
        try {
            return await addBlock(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const get_blocks = createAsyncThunk(
    "get_blocks",
    async (filter, { rejectWithValue }) => {
        try {
            return await getBlocks(filter);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const get_block_by_id = createAsyncThunk(
    "get_block_by_id",
    async (id, { rejectWithValue }) => {
        try {
            return await getBlockByID(id);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const update_block_by_id = createAsyncThunk(
    "update_block_by_id",
    async (data, { rejectWithValue }) => {
        try {
            console.log('data', data);
            return await updateBlockByID(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const delete_block_by_id = createAsyncThunk(
    "delete_block_by_id",
    async (id, { rejectWithValue }) => {
        try {
            return await DeleteBlockByID(id);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const get_blocks_by_phase = createAsyncThunk(
    "get_blocks_by_phase",
    async (id, { rejectWithValue }) => {
        try {
            return await getBlocksByPhase(id);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Slice
const blockSlice = createSlice({
    name: "block",
    initialState: {
        loading: false,
        blocks: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Add block cases
            .addCase(add_block.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(add_block.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(add_block.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get blocks cases
            .addCase(get_blocks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_blocks.fulfilled, (state, action) => {
                state.loading = false;
                state.blocks = action.payload;
            })
            .addCase(get_blocks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get blocks by phase cases
            .addCase(get_blocks_by_phase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_blocks_by_phase.fulfilled, (state, action) => {
                state.loading = false;
                state.blocks = action.payload;
            })
            .addCase(get_blocks_by_phase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default blockSlice.reducer;
