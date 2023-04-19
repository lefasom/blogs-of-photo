import { createSlice } from "@reduxjs/toolkit";
import { db } from '../firebase/firebase.js'
import { collection, deleteDoc, addDoc, doc, setDoc } from "firebase/firestore";
const collectionName = "crudImg"

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        session: false
    },
    reducers: {
        stateUser: (state, action) => {
            const session = action.payload
            state.session = session
        },

    }
})


export const {
    stateUser,
} = sessionSlice.actions

export default sessionSlice.reducer

