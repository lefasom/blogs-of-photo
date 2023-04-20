import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPerson } from '../redux/personSlice'
import { uploadFile } from '../firebase/firebase'
import { useAuth0 } from '@auth0/auth0-react'

import '../styles/upload.css'
import InfoFIle from '../components/InfoFIle'

function Upload() {
  const person = useSelector((state) => state.person.list)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('all')
  const [subCategory, setSubcategory] = useState('all')
  const [color, setColor] = useState('all')
  const [type, setType] = useState('photo')
  const [typeINTERNA, setTypeINTERNA] = useState('all')

console.log(typeINTERNA)

  const [length, setLength] = useState(0)

  const [load, setLoad] = useState(false)
  const [photo, setPhoto] = useState('')
  const [idUser, setIdUser] = useState('')
  const [nickname, setNickname] = useState('')

  const { isAuthenticated, user } = useAuth0()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cargarPhoto = async (e) => {
    const result = await uploadFile(e)
    setPhoto(result)
    setLoad(true)
  }

  const handleSubmit = async () => {
    dispatch(addPerson({ type, color, subCategory, category, description, photo, idUser }))
    navigate('/')
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    } else if (isAuthenticated) {
      setIdUser(user.email)
      setNickname(user.nickname)
      setLength((person.filter((e => { return (e.idUser == user.email) })).length))
    }
  }, [isAuthenticated])

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <InfoFIle nickname={nickname} title={'Upload'} length={length} />

      <div className="container-upload">
        <div className='img'>

          {typeINTERNA.includes('video')?
            <video controls src={photo} alt="" />
            :
            <img src={photo} alt="" />
          }
          {!load &&
            <p>EMPTY...</p>
          }
          <input type="file" name="" id="" onChange={(e) => { cargarPhoto(e.target.files[0]) 
          setTypeINTERNA(e.target.files[0].type)
          }} />
        </div>
        <div className='category'>
          <h4>Category</h4>
          <select onChange={(e) => setType(e.target.value)}>
            <option value="photo">Photo</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="all">Category</option>
            <option value="sport">Sport</option>
            <option value="art">Art</option>
            <option value="architecture">Architecture</option>
            <option value="vehicle">Vehicle</option>
            <option value="nature">Nature</option>
          </select>
          <select onChange={(e) => setSubcategory(e.target.value)}>
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
          <select onChange={(e) => setColor(e.target.value)}>
            <option value="all">Color</option>
            <option value="redf">Red</option>
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
          <textarea onChange={(e) => setDescription(e.target.value)} setloading />
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

export default Upload

