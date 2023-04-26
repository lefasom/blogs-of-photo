import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        list: []
    },
    reducers: {

        currentAuth: (state, action) => {
            state.list = action.payload
        },

    }
})


export const {
    currentAuth,
} = authSlice.actions

export default authSlice.reducer

