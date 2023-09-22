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

export const login = createAsyncThunk('user/login', async (data) => {
    try {
        const response = await axios.post('/api/users/login', data)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const logout = createAsyncThunk('user/logout', async (state, action) => {
    try {
        const response = await axios.post('/api/users/logout')
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
                state.loading = false
                if (action.payload.error !== undefined) {
                    state.error = action.payload.error
                } else {
                    // state.user = action.payload.userData
                    state.success = true
                }
            })
            .addCase(login.pending, (state, action) => {
                state.error = {}
                state.user = {}
                state.success = false
                state.loading = true
                state.isAuthenticated = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.error !== undefined) {
                    state.error = action.payload.error
                } else {
                    state.user = action.payload.userData
                    state.success = true
                    state.isAuthenticated = Object.keys(state.user).length !== 0
                }
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.error = {}
                state.user = {}
                state.success = false
                state.loading = false
                state.isAuthenticated = false
            })
    }
})

export const getError = state => state.error
export const successStatus = state => state.success
export const getLoadingStatus = state => state.loading
export const isAuthenticated = state => state.isAuthenticated


export default userSlice.reducer