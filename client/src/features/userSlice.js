import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isAuthenticated: false,
    user: {},
    error: {}
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})

export default userSlice.reducer