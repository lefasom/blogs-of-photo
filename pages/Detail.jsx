import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/detail.css'
import { updateFav } from '../redux/userSlice'




function Detail() {

    
    let user = useSelector((state) => state.auth.list)
    if (user) {
        localStorage.setItem('user', user)
    } else {
        user = localStorage.getItem('user')
    }
    let idUser = user.id
    if (idUser) {
        localStorage.setItem('idUser', idUser)
    } else {
        idUser = localStorage.getItem('idUser')
    }
    const dispatch = useDispatch()
    const favoritePush = () => {
        dispatch(updateFav({ idUser, photo }))

    }
    //persistencia en la foto
    const { id } = useParams()
    const images = useSelector((state) => state.images.list)
    const IMG_DETAIL = images.find((val) => { return val.id == id })

    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [idphoto, setIdphoto] = useState('')
    const [like, setLike] = useState(0)

    useEffect(() => {
        if (!IMG_DETAIL?.photo) {
            setPhoto(localStorage.getItem('photo'))
            setDescription(localStorage.getItem('description'))
            setIdphoto(localStorage.getItem('idimg'))
            setLike(localStorage.getItem('like'))
        } else {
            localStorage.setItem('photo', IMG_DETAIL.photo)
            localStorage.setItem('description', IMG_DETAIL.description)
            localStorage.setItem('idimg', IMG_DETAIL.id)
            localStorage.setItem('like', IMG_DETAIL.like)

            setPhoto(IMG_DETAIL?.photo)
            setDescription(IMG_DETAIL?.description)
            setIdphoto(IMG_DETAIL?.id)
            setLike(IMG_DETAIL?.like)

        }


    }, [])
    function downloadImage(url) {
        // Crear un elemento <a> para descargar la imagen
        var link = document.createElement("a");
        link.href = url;
        link.download = "imagen.jpg";
        // Simular un click en el enlace
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div className='container-detail'>
            <div className='container-detail_background'>
                <img
                    src={photo} alt=''
                />
                <button onClick={() => downloadImage(photo)}>Descargar imagen</button>
                <div className='container-detail_controls'>
                    <span onClick={() => favoritePush()} className="material-symbols-outlined">
                        favorite
                    </span>
                    <span
                        className="material-symbols-outlined">
                        download
                    </span>
                </div>

                <section className='container-detail_review'>
                    <div className='container-detail_review-2'>
                        <div>
                            <h5>Puntaje de popularidad</h5>
                            <p>Alto</p>
                        </div>
                        <div>
                            <h5>Puntaje de uso</h5>
                            <p>Muy usado</p>
                        </div>
                    </div>
                    <div>
                        <h5>Superestrella</h5>
                        ¡A los clientes de Shutterstock les encanta este elemento!
                    </div>
                </section>

                <section className='container-detail_description'>
                    <h5>Identificación del Ilustración de stock:  <b>{idphoto}</b> </h5>
                    <p>{description}</p>
                    <h5>me gustas {like}</h5>
                </section>
            </div>




            <section className='container-detail_same'>
                <h3>Imagenes similares</h3>
                {
                    // array2.map((val) => { return (<p key={val.id}>{val.val}</p>) })
                }
                {'---------------------->'}ACA VA UN SLIDER{'<-------------------'}
            </section>
        </div>
    )
}
export default Detail