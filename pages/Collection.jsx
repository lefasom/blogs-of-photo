import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { db } from '../firebase/firebase.js'
import { collection, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from 'react-redux'
import { currentImages } from '../redux/imagesSlice.js'
import '../styles/collection.css'
import InfoFIle from '../components/InfoFIle.jsx'
import { deleteImgs } from '../redux/imagesAction.js'
const collectionName = "crudImg"

function Collection() {

  const [nickname, setNickname] = useState('')

  const dispatch = useDispatch()
  const { user } = useAuth0()


  const images = useSelector((state) => state.images.list)
  const img = images.filter((val) => { return (val.idUser == user?.email) })

  const onDeleteLink = (id) => {
    dispatch(deleteImgs({ id }))
  }

  useEffect(() => {
    const getImages = async () => {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id })
      });
      dispatch(currentImages(docs));
    }

    getImages()
    setNickname(user?.nickname)

  }, [])

  return (<>
    <br />
    <br />
    <br />
    <br />
    <InfoFIle nickname={nickname} title={'Collection'} length={img.length} />
    <div className="container-collection">
      {img.map((val) => (
        <div key={val.id} className='container-img'>
          <Link to={`/Detail/${val.id}`}>
            <img className={val.id % 2 ? 'img' : 'img2'} src={val.photo} alt="" />
          </Link>
          <button onClick={() => onDeleteLink(val.id)}>
            <span className="material-symbols-outlined">
              delete
            </span>
          </button>
        </div>
      ))}
    </div>
  </>)
}

export default withAuthenticationRequired(Collection)