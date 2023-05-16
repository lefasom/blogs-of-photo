import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react";
import { currentAuth } from "../redux/authSlice";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../firebase/firebase";


export default function useFetch() {

    const dispatch = useDispatch()
    const { user, isAuthenticated } = useAuth0()

    useEffect(() => {
        if (isAuthenticated && user) {
            const email = user?.email
            ///////////////////////////


            const userRef = collection(db, 'crudUser');
            const q = query(userRef, where('email', '==', email));
            getDocs(q).then((querySnapshot) => {
                // querySnapshot.forEach((doc) => {
                //     console.log(doc.id, " => ", doc.data());
                // });
                // console.log(querySnapshot.docs[0]._document.data.value.mapValue.fields.favorite.stringValue)
                if (querySnapshot.docs.length == 0) {
                    console.log('creando nuevo usuario')
                    const session = true
                    addDoc(collection(db, 'crudUser'), { email, session })
                } else {
                    const id = querySnapshot.docs[0].id
                    dispatch(currentAuth({ email, id }))
                }
            })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            ///////////////////////////
        }
    }, [dispatch, user, isAuthenticated])
}
