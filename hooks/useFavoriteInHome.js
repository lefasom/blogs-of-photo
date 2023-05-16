import { useEffect, useState } from 'react'
// import {addToFavorites, loginUser} from '../Redux/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, getImages, getImg } from '../redux/imagesAction'
import { doc, getDoc, setDoc } from '@firebase/firestore'
import { db } from '../firebase/firebase'
// import { getErrors } from '../Redux/apiSlice'

export default function useFavoriteInHome() {

    const dispatch = useDispatch()

    const [inFavor, setInfavor] = useState(false)

//     useEffect(() => {
//         const asy = async () => {
//             const data = await getDoc(doc(db, 'crudImg', id))
//             let img = data.data()
//         }
// asy()
//     }, [dispatch])

    // useEffect(()=>{
    //     if (favorite?.includes(email)) setInfavor(true)

    //     console.log((favorite?.includes(email)))

    // },[user?.favorites, id])

    const favor = (id) => {
        console.log(id)

        setInfavor(prev => !prev)
    }
    return [inFavor, favor]
}
