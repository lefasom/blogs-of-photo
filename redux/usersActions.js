import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase";
import { currentUsers } from "./usersSlice";



export function getUsers(){
    return async(dispatch) =>{
        try {
            const querySnapshot = await getDocs(collection(db, 'crudUser'));
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            dispatch(currentUsers(docs));

        } catch (error) {
            console.log(error)
        }
    }
}      