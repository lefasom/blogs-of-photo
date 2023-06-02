import { createSlice } from "@reduxjs/toolkit";


//no lo estoy utilizando pero traigo todos los usuarios


export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: []
    },
    reducers: {
        currentUsers: (state, action) => {
            state.list = action.payload
        }
    }
})


export const {
    currentUsers,
} = usersSlice.actions

export default usersSlice.reducer

