import React, { useEffect } from 'react'
import { db } from '../firebase/firebase.js'
import { collection, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from 'react-redux'
import { currentPerson } from '../redux/personSlice.js'

import Galery from '../components/Galery.jsx'

const collectionName = "crudImg"

function Home() {

    //<redux>

    const dispatch = useDispatch()
    const person = useSelector((state) => state.person.list)

    const getLinks = async () => {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
        });
        dispatch(currentPerson(docs));
    }

    useEffect(() => {
        getLinks()
    })


    //</redux>

    return (
        <>
            <Galery imgs={person} />
        </>
    )
}

export default Home