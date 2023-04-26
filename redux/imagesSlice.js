import { createSlice } from "@reduxjs/toolkit";
import { db } from '../firebase/firebase.js'
import { collection, deleteDoc, addDoc, doc, setDoc } from "firebase/firestore";
const collectionName = "crudImg"

export const imagesSlice = createSlice({
    name: 'images',
    initialState: { list: [] },
    reducers: {
        currentImages: (state, action) => {
            state.list = action.payload
        },

        deleteImages: (state, action) => {
            const id = action.payload
            const listNew = state.list.filter((e) => { return (e.id != action.payload) })
            state.list = listNew
            deleteDoc(doc(db, collectionName, id))
        },
        addImages: (state, action) => {
            const { type, color, subCategory, category, description, photo, idUser } = action.payload
            const like = 0 
            addDoc(collection(db, collectionName), { like, type, color, subCategory, category, description, photo, idUser })
        },
        updateImage:(state, action)=>{
            
        }

    }
})


export const {
    currentImages,
    deleteImages,
    addImages,
} = imagesSlice.actions

export default imagesSlice.reducer

