import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createChargeTypeService, getChargeTypesService } from '../Services/chargesTypeServicces'; // Importing the service

// Async thunk for creating a charge type
export const createChargeType = createAsyncThunk(
    'chargeType/create',
    async (chargeName, { rejectWithValue }) => {
        try {
            const data = await createChargeTypeService(chargeName);
            return data.chargeType; // Return the created charge type
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for getting charge types
export const getChargeTypes = createAsyncThunk(
    'chargeType/get',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getChargeTypesService();
            return data.chargeTypes; // Return the fetched charge types
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Create slice
const chargeTypeSlice = createSlice({
    name: 'chargeType',
    initialState: {
        chargeTypes: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createChargeType.pending, (state) => {
                state.loading = true;
            })
            .addCase(createChargeType.fulfilled, (state, action) => {
                state.loading = false;
                // state.chargeTypes.push(action.payload); // Add the new charge type to the state
            })
            .addCase(createChargeType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set the error message
            })
            .addCase(getChargeTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getChargeTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.chargeTypes = action.payload; // Set the fetched charge types to the state
            })
            .addCase(getChargeTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Set the error message
            });
    },
});

// Export the reducer
export default chargeTypeSlice.reducer;
