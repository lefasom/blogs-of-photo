import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addPerson } from '../redux/personSlice'
import { uploadFile } from '../firebase/firebase'
import { useAuth0 } from '@auth0/auth0-react'

import '../styles/upload.css'

function Upload() {

  const [description, setName] = useState('')
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
    dispatch(addPerson({ description, photo, idUser }))
    navigate('/')
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }else if (isAuthenticated) {
      setIdUser(user.email)
      setNickname(user.nickname)
    }
  }, [isAuthenticated])


  return (
    <div className='container-upload'>
      <br />
      <br />
      <br />
      <br />
      <div className='container-upload_description'>
        <div className='container-upload_description-A'>
          <h3> {nickname}</h3>
          {'>'}
          <p>Upload </p>
        </div>
        <div className='container-upload_description-B'>
          <h1>Upload(12)</h1>
          <button>Upload</button>
        </div>
      </div>

      <div className="containerpro">
        <div className="miName">
          <input type="file" name="" id="" onChange={(e) => { cargarPhoto(e.target.files[0])}} />
          <h4>Mi Nombre</h4>
          <input name='name' type="text" onChange={(e) => setName(e.target.value)} setloading />
          <h4>Mi Foto</h4>
          {load && <p>cargando...</p>}
          {(!photo == '') &&
            <button onClick={() => { handleSubmit() }} >
              Registrar
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default Upload

