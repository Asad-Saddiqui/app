import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addPhase,
    deletePhaseByID,
    getPhaseByID,
    getPhases,
    updatePhaseByID
} from "../Services/phaseService";

// Async Thunks
export const add_Phase = createAsyncThunk(
    "phase/add",
    async (data, { rejectWithValue }) => {
        try {
            const res = await addPhase(data);
            return res;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const get_phases = createAsyncThunk(
    "phase/getAll",
    async (data, { rejectWithValue }) => {
        try {
            return await getPhases(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const get_phase_by_id = createAsyncThunk(
    "phase/getById",
    async (id, { rejectWithValue }) => {
        try {
            return await getPhaseByID(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const update_phase_by_id = createAsyncThunk(
    "phase/update",
    async (data, { rejectWithValue }) => {
        try {
            return await updatePhaseByID(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const delete_phase_by_id = createAsyncThunk(
    "phase/delete",
    async (id, { rejectWithValue }) => {
        try {
            return await deletePhaseByID(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const phaseSlice = createSlice({
    name: "Phase",
    initialState: {
        loading: false,
        phases: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Add Phase
            .addCase(add_Phase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(add_Phase.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(add_Phase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })

            // Fetch Phases
            .addCase(get_phases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_phases.fulfilled, (state, action) => {
                state.loading = false;
                state.phases = action.payload;
            })
            .addCase(get_phases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch phases';
            })

            // Get Phase by ID
            .addCase(get_phase_by_id.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(get_phase_by_id.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(get_phase_by_id.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch phase by ID';
            })

            // Update Phase by ID
            .addCase(update_phase_by_id.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(update_phase_by_id.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(update_phase_by_id.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update the phase';
            })

            // Delete Phase by ID
            .addCase(delete_phase_by_id.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(delete_phase_by_id.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(delete_phase_by_id.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete the phase';
            });
    },
});

export default phaseSlice.reducer;
