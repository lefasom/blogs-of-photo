import React, { useEffect, useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { db } from '../firebase/firebase.js'
import { collection, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from 'react-redux'
import { currentPerson, deletePerson } from '../redux/personSlice.js'
import '../styles/collection.css'
import InfoFIle from '../components/InfoFIle.jsx'
const collectionName = "crudImg"

function Collection() {


  const [nickname, setNickname] = useState('')


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useAuth0()


  const person = useSelector((state) => state.person.list)

  const img = person.filter((val) => { return (val.idUser == user?.email) })

console.log(img)
  const onDeleteLink = (id) => {
    dispatch(deletePerson(id))
  }

  useEffect(() => {
      setNickname(user?.nickname)
      const getLinks = async () => {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
        });
        dispatch(currentPerson(docs));
    }
    
         getLinks()
  },[])



  return (<> 
  
       <br />
      <br />
      <br />
      <br />
      <InfoFIle nickname={nickname} title={'Collection'} length={img.length}/>
     
    <div className="container-collection">
        {img.map((val) => (
          <div key={val.id} className='container-img'>
            <Link to={`/Detail/${val.id}`}>
              <img className={val.id % 2 ? 'img' : 'img2'} src={val.photo} alt="" />
            </Link>
            <button onClick={() =>
              onDeleteLink(val.id)
            }>
              <span className="material-symbols-outlined">
                delete
              </span>
            </button>
          </div>
        ))}
      </div>
  </>)
}

export default Collection