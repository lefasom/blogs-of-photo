import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import { doc, getDoc } from '@firebase/firestore'
import { db } from '../firebase/firebase'
import '../styles/favorite.css'
function Favorite() {
    const [objeto,setObjeto] = useState([])
    const user = useSelector((state) => state.auth.list)
    let idUser = user.id
    if (idUser) {
        localStorage.setItem('idUser', idUser)
    } else {
        idUser = localStorage.getItem('idUser')
    }
    useEffect(()=>{
        obtenerFav()

    },[])
    const obtenerFav = async () => {
        const data = await getDoc(doc(db, 'crudUser', idUser))
        let favorites = data.data().favorite
        favorites = favorites.split(',')
const objetos = favorites.map((elemento, index) => {
    return { id: index + 1, nombre: elemento };
  });
  setObjeto(objetos)
    }
console.log(objeto)

    return (
        <>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

{objeto.map((val)=>{
    return(
      <img key={val.id}src={val.nombre} alt="" />
    )
})}
        </>
    )
}

export default withAuthenticationRequired(Favorite)