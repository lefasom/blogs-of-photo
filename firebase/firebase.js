// Import the functions you need from the SDKs you need
import { initializeApp }  from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { v4 } from 'uuid'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjTBfFEPrDI_rVPgolO6Bke5CnVgocdXw",
  authDomain: "fir-ebd05.firebaseapp.com",
  projectId: "fir-ebd05",
  storageBucket: "fir-ebd05.appspot.com",
  messagingSenderId: "148316109698",
  appId: "1:148316109698:web:e985cf840a2af2130f6d9b",
  measurementId: "G-9GF4MC32P5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Acciones de firebase
export const db = getFirestore(app)
export const storage = getStorage(app)

export async function uploadFile(file){
 const storageRef = ref(storage, v4())
 await uploadBytes(storageRef, file)
 const url = await getDownloadURL(storageRef)
 return url
}

