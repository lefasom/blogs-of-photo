import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/detail.css'
import { addFav, deleteFav } from '../redux/usersSlice'
import { addFavorite, getImg } from '../redux/imagesAction'
import useFetch from '../hooks/useFetch'
import useFavorite from '../hooks/useFavorite'
//arreglar persistencia en la foto,...YES
//  ...funciene la actualizacion de color ... LA IDEA ES COMPARAR LAS FOTOS CON MIS FAVORITOS Y INICIAR LA LISTA CON SUS ESTADOS YA SEA LIKE O DISLIKE
//...en el corazon de favorite



function Detail() {
    //persistencia en la foto
    const { id } = useParams()
    const detailImg = useSelector((state) => state.images.detailImg.img)
    const auth = useSelector((state) => state.auth.list.email)
    const array = detailImg?.favorite.split(',')

    const [inFavor, favor] = useFavorite()
    //////////////
    const dispatch = useDispatch()
    useFetch()

    useEffect(() => {
        dispatch(getImg(id))
    }, [inFavor,favor])

    return (
        <div className='container-detail'>
            <div className='container-detail_background'>
                <img
                    src={detailImg?.photo} alt=''
                />
                <div className={inFavor ? 'container-detail_controls-red' : 'container-detail_controls'}>
                    {auth &&
                        <span onClick={favor} className="material-symbols-outlined">
                            favorite
                        </span>
                    }


                </div>
                {/* 
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
                </section> */}

                <section className='container-detail_description'>
                    <h5>Identificación del Ilustración de stock:  <b>{detailImg?.id}</b> </h5>
                    <p>{detailImg?.description}</p>
                    <h5>me gustas {array?.length - 1}</h5>
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