import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/detail.css'
import { useAuth0 } from '@auth0/auth0-react'
// import { blogAnime } from '../src/assets/img'

function Detail() {

    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()

    const person = useSelector((state) => state.person.list)
    const IMG_DETAIL = person.find((val) => { return val.id == id })

    useEffect(() => {
        setPhoto(IMG_DETAIL.photo)
        setDescription(IMG_DETAIL.description)
    }, [])
    // const download = async e => {
    //     console.log(e.target.src,'e');
    //    await fetch(e.target.src, {
    //         method: "GET",
    //         headers: {

    //                 'Content-Type':'application/json'
    //         }
    //     })
    //         .then(response => {
    //             response.arrayBuffer().then(function (buffer) {
    //                 const url = window.URL.createObjectURL(new Blob([buffer]));
    //                 const link = document.createElement("a");
    //                 link.href = url;
    //                 link.setAttribute("download", "image.webp"); //or any other extension
    //                 document.body.appendChild(link);
    //                 link.click();
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };
    // const array2 = array.filter((val) => { return val.id < 4 })

    return (
        <div className='container-detail'>
            <div className='container-detail_background'>
                <img
                    //onClick={(e) => download(e)} 
                    src={photo} alt=''
                />

                <div className='container-detail_controls'>
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                    <span
                        //onClick={() => download(IMG_DETAIL)} 
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
                    <h5>Identificación del Ilustración de stock:  <b>{IMG_DETAIL.id}</b> </h5>
                    <p>{description}</p>
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