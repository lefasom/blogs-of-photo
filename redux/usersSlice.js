import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";




export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: []
    },
    reducers: {

        currentUsers: (state, action) => {
            state.list = action.payload
        },
        addFav: async (state, action) => {
            const { idUser, photo } = action.payload
            console.log(idUser)
            const data = await getDoc(doc(db, 'crudUser', idUser))
            console.log(data.data())
            let email = data.data().email
            let session = data.data().session
            let favorite = data.data().favorite
            favorite += ',' + photo
            setDoc(doc(db, 'crudUser', idUser), { email, favorite, session })
            console.log('like')
        },
        deleteFav: async (state, action) => {
            const { idUser, photo } = action.payload
            console.log(idUser)
            const data = await getDoc(doc(db, 'crudUser', idUser))
            console.log(data.data())
            let email = data.data().email
            let session = data.data().session
            let favorite = data.data().favorite
            favorite = favorite.replace(photo, '')
            setDoc(doc(db, 'crudUser', idUser), { email, favorite, session })
            console.log('dislike')
       
        },
    }
})


export const {
    currentUsers,
    addFav,
    deleteFav
} = usersSlice.actions

export default usersSlice.reducer

