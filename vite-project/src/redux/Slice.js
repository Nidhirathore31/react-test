import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk("FETCH_DATA", async () => {
    try {
        const response = await axios.get("https://ulventech-react-exam.netlify.app/api/form")
        return response.data.data
    }
    catch (error) {
        console.log(error)
    }
})
export const newFetchData = createAsyncThunk("NEW_THUNK", async (data) => {
    try {
        const response = await axios.post("https://ulventech-react-exam.netlify.app/api/form", data)
        return response.data
    }
    catch (error) {
        console.log(error)
    }
})
const slice = createSlice({
    name: "api",
    initialState: {
        value: [],
        isSuccess: false,
        isError: false,
        isPending: false,
        responseData: {}
    },
    reducers: {
        fieldChange: (state, action) => {
            const { index, value } = action.payload
            state.value[index].value = value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state, action) => {
                state.isError = false;
                state.isSuccess = false;
                state.isPending = true;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isPending = false;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isPending = false;
                state.value = action.payload
            })
            .addCase(newFetchData.pending, (state, action) => {
                state.isError = false;
                state.isSuccess = false;
                state.isPending = true;
            })
            .addCase(newFetchData.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isPending = false;
            })
            .addCase(newFetchData.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isPending = false;
                state.responseData = action.payload;
            })
    }
})
export default slice.reducer
export const { fieldChange } = slice.actions