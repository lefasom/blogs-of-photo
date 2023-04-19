import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { db } from '../firebase/firebase.js'
import { collection, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from 'react-redux'
import { currentPerson, deletePerson } from '../redux/personSlice.js'

const collectionName = "crudImg"

function Collection() {

  const [nickname, setNickname] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useAuth0()


  const person = useSelector((state) => state.person.list)
  const img = person.filter((val) => { return (val.idUser == user.email) })

  const getLinks = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id })
    });
    dispatch(currentPerson(docs));
  }

  const onDeleteLink = (id) => {
    dispatch(deletePerson(id))
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    } else if (isAuthenticated) {
      setNickname(user.nickname)
    }
  }, [isAuthenticated])

  useEffect(() => {
    getLinks()
  })

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className='container-upload_description'>
        <div className='container-upload_description-A'>
          <h3>{nickname}</h3>
          {'>'}
          <p>Collection </p>
        </div>
        <div className='container-upload_description-B'>
          <h1>Collection({img.length})</h1>
        </div>
      </div>
      <div className='container'>
        {img.map((val) => (
          <div key={val.id} className='container-img'>
            <Link to={`/Detail/${val.id}`}>
              <img className={val.id % 2 ? 'img' : 'img2'} src={val.photo} alt="" />
            </Link>
            <button onClick={() =>
              onDeleteLink(val.id)
            }>delete</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Collection