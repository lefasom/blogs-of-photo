import { createSlice } from "@reduxjs/toolkit";
import { db } from '../firebase/firebase.js'
import { collection, deleteDoc, addDoc, doc, setDoc } from "firebase/firestore";
const collectionName = "crudImg"

export const personSlice = createSlice({
    name: 'person',
    initialState: { list: [] },
    reducers: {
        currentPerson: (state, action) => {
            state.list = action.payload
        },
   
        deletePerson: (state, action) => {
            const id = action.payload
            const listNew =  state.list.filter((e)=>{return(e.id != action.payload)})
            state.list = listNew
            deleteDoc(doc(db, collectionName, id))
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

