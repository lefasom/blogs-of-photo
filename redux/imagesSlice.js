import { createSlice } from "@reduxjs/toolkit";
import { db } from '../firebase/firebase.js'
import { collection, deleteDoc, addDoc, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
const collectionName = "crudImg"

export const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        list: [],
        favorites: [],
        favoritesString:'',
        detailImg: [],
    },
    reducers: {
        currentImages: (state, action) => {
            state.list = action.payload
        },
        currentFavorites: (state, action) => {
            state.favorites = action.payload
        },
        currentFavStr: (state, action) => {
            state.favoritesString = action.payload
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
            const favorite = ''
            const id = v4()
            addDoc(collection(db, collectionName), { id, favorite, like, type, color, subCategory, category, description, photo, idUser })
        },
        detailImg: (state, action) => {
            state.detailImg = action.payload
        }

    }
})


export const {
    currentImages,
    currentFavorites,
    deleteImages,
    addImages,
    detailImg,
    currentFavStr
} = imagesSlice.actions

export default imagesSlice.reducer

