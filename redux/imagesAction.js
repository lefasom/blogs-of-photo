import { collection, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";
import { currentFavStr, currentFavorites, currentImages, detailImg } from "./imagesSlice";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";



export function getImages() {
    return async (dispatch) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'crudImg'));
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            dispatch(currentImages(docs));
        } catch (error) {
            console.log(error)
        }
    }
}

export function getImg(id) {
    // console.log(id)
    return async (dispatch) => {
        try {
            const data = await getDoc(doc(db, 'crudImg', id))
            let img = data.data()
            // console.log(img)
            dispatch(detailImg({ img, id }))

        } catch (error) {
            console.log(error)
        }
    }
}



export function addFavorite({ id, category, color, description, favorite, idUser, like, photo, subCategory, type, email }) {

    return async (dispatch) => {
        try {
            console.log('original:', favorite)

            if (!favorite?.includes(email)) {
              favorite += `,${email}`
              console.log('add:', favorite)
            } else {
              favorite = favorite.replace(`,${email}`, '')
              console.log('rest:', favorite)
            }
          
           const res = setDoc(doc(db, 'crudImg', id), { category, color, description, favorite, idUser, like, photo, subCategory, type })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
}      