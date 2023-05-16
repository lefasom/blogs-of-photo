import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addImages, currentImages } from '../redux/imagesSlice'
import { db, uploadFile } from '../firebase/firebase'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import '../styles/upload.css'
import InfoFIle from '../components/InfoFIle'
import { collection, getDocs } from '@firebase/firestore'

function Upload() {

  const dispatch = useDispatch()
  const images = useSelector((state) => state.images.list)

  const [photo, setPhoto] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('all')
  const [subCategory, setSubcategory] = useState('all')
  const [color, setColor] = useState('all')
  const [type, setType] = useState('photo')
  const [typeINTERNA, setTypeINTERNA] = useState('all')

  const [length, setLength] = useState(0)// se lo paso a infoFile para saber la cantidad de elementos actuales de upload

  const { user } = useAuth0()
  const [idUser, setIdUser] = useState('')
  const [nickname, setNickname] = useState('')


  const cargarPhoto = async (e) => {
    const result = await uploadFile(e)
    setPhoto(result)
  }

  const handleSubmit = () => {
    dispatch(addImages({ type, color, subCategory, category, description, photo, idUser }))
    setDescription('')
    setCategory('all')
    setSubcategory('all')
    setColor('all')
    setType('photo')
    setPhoto('')
  }

  useEffect(() => {

    const getLinks = async () => {
      const querySnapshot = await getDocs(collection(db, 'crudImg'));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id })
      });
      dispatch(currentImages(docs));
    }

    getLinks()
    setIdUser(user.email)
    setNickname(user.nickname)
    setLength((images.filter((e => { return (e.idUser == user.email) })).length))
  }, [handleSubmit])

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <InfoFIle nickname={nickname} title={'Upload'} length={length} />
      <div className="container-upload">
        <div className='img'>

          {typeINTERNA.includes('video') ?
            <video controls src={photo} alt="" />
            :
            <img src={photo} alt="" />
          }
          {photo == '' && <p>empty</p>

          }
          <input type="file" onChange={(e) => {
            cargarPhoto(e.target.files[0])
            setTypeINTERNA(e.target.files[0].type)
          }} />
        </div>
        <div className='category'>
          <h4>Category</h4>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="photo">Photo</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Category</option>
            <option value="sport">Sport</option>
            <option value="art">Art</option>
            <option value="architecture">Architecture</option>
            <option value="vehicle">Vehicle</option>
            <option value="nature">Nature</option>
          </select>
          <select value={subCategory} onChange={(e) => setSubcategory(e.target.value)}>
            <option value="all">Sub category</option>
            {category == 'art' && <>
              <option value="music">Music</option>
              <option value="cartoon">Cartoon</option>
              <option value="anime">Anime</option>
              <option value="cinema">Cinema</option>
              <option value="comic">Comic</option>
              <option value="fantasy">Fantasy</option>
            </>}
            {category == 'sport' && <>
              <option value="futbol">Football</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="rugby">Rugby</option>
              <option value="fight">Fight</option>
              <option value="american">American</option>

            </>}
            {category == 'architecture' && <>
              <option value="bridge">Bridge</option>
              <option value="house">House</option>
              <option value="tower">Tower</option>
              <option value="stadium">Stadium</option>
              <option value="building">Building</option>
            </>}
            {category == 'vehicle' && <>
              <option value="car">car</option>
              <option value="bicycle">bicycle</option>
              <option value="skateboard">skateboard</option>
              <option value="motorcycle">motorcycle</option>
              <option value="plane">plane</option>
            </>}
          </select>
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="all">Color</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="violet">Violet</option>
            <option value="orange">Orange</option>
            <option value="black">Black</option>
            <option value="silver">Silver</option>
          </select>
        </div>
        <div className='description'>
          <h4>Description</h4>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}  />
        </div>
        <div className='upload'>
          {(!photo == '') &&
            <button onClick={() => { handleSubmit() }} >
              Upload
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default withAuthenticationRequired(Upload)

