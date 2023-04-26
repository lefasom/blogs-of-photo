import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";


const querySnapshot = await getDocs(collection(db, 'crudUser'));
const docs = [];
querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id })
});//lo uso pra verificar antes de usar addDoc en crudUser


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        list: []
    },
    reducers: {
        addUser: (state, action) => {
            const { email } = action.payload
            let data = docs.find((e) => { return (e.email == email) })
            // console.log('data', data)
            if (!data) {

                const favorite = []
                const session = true
                addDoc(collection(db, 'crudUser'), { email, favorite, session })
            }

        },
        currentUser: (state, action) => {
            state.list = action.payload
        },
        updateFav:  async(state, action) => {
            const { idUser,photo } = action.payload
            console.log(idUser)
            const data = await getDoc(doc(db,'crudUser',idUser))
            console.log(data.data())
           let email= data.data().email
           let session= data.data().session
           let favorite = data.data().favorite
            favorite += ','+photo
            setDoc(doc(db, 'crudUser', idUser), { email, favorite, session })
        },
    }
})


export const {
    addUser,
    currentUser,
    updateFav
} = userSlice.actions

export default userSlice.reducer

