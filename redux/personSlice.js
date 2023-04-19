import { createSlice } from "@reduxjs/toolkit";
import { db } from '../firebase/firebase.js'
import { collection, deleteDoc, addDoc, doc, setDoc } from "firebase/firestore";
const collectionName = "crudImg"

export const personSlice = createSlice({
    name: 'person',
    initialState:{list:[]},
    reducers: {
        currentPerson: (state, action) => {
            state.list = action.payload
        },
        addPerson: (state, action) => {
            const { description , photo, idUser} = action.payload
            addDoc(collection(db, collectionName), {description,photo,idUser})
        },
        deletePerson: (state, action) => {
            const id = action.payload
            deleteDoc(doc(db, collectionName, id))
        },
        updatePerson: (state, action) => {
            const { photo, name, id } = action.payload
            setDoc(doc(db, collectionName, id), { photo, name })
        },
    }
})
   

export const {
    currentPerson,
    addPerson,
    deletePerson,
    updatePerson,
} = personSlice.actions

export default personSlice.reducer

