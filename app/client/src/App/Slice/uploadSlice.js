// src/slice/uploadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseurl } from '../../utils/baseUrl';

// Define initial state
const initialState = {
    file: null,
    uploading: false,
    uploadProgress: 0,
    error: null,
};

// Async thunk for file upload
export const uploadFile = createAsyncThunk(
    'upload/uploadFile',
    async (formData, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post(`${baseurl}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,  // Include credentials in the request
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    dispatch(setUploadProgress(percentCompleted));
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for file deletion
export const deleteFile = createAsyncThunk(
    'upload/deleteFile',
    async (fileId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseurl}/api/upload/${fileId}`, {
                withCredentials: true,  // Include credentials in the request
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create a slice of the Redux store
const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setUploadProgress(state, action) {
            state.uploadProgress = action.payload;
        },
        resetUpload(state) {
            state.file = null;
            state.uploadProgress = 0;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.uploading = true;
                state.error = null;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.uploading = false;
                state.file = action.payload.file;
                state.uploadProgress = 0;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.payload || 'Upload failed';
            })
            .addCase(deleteFile.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteFile.fulfilled, (state) => {
                state.file = null;
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.error = action.payload || 'Delete failed';
            });
    },
});

// Export actions and reducer
export const { setUploadProgress, resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
