import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isAuthenticated: false,
    user: {},
    error: {},
    success: false,
    loading: false
}

export const register = createAsyncThunk('user/register', async (data) => {
    try {
        const response = await axios.post('/api/users/register', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(register.pending, (state, action) => {
                state.error = {}
                state.user = {}
                state.success = false
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false
                if (action.payload.error !== undefined) {
                    state.error = action.payload.error
                } else {
                    // state.user = action.payload.userData
                    state.success = true
                }
            })
    }
})

export const getError = state => state.user.error
export const successStatus = state => state.user.success
export const getLoadingStatus = state => state.user.loading


export default userSlice.reducer