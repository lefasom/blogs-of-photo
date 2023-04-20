import React, { useEffect, useState } from 'react'
import { Link, useFetcher } from 'react-router-dom'
import { blogAnime } from '../src/assets/img'
import '../styles/galery.css'

function Galery({ imgs, category, subCategory, color, type }) {

  let IMG_FILTER_CATEGORY = []
  const [inf, setInf] = useState(0)
  const [sup, setSup] = useState(20)
  const [pagina, setPagina] = useState(0)


  if (category == 'all' && color == 'all') {
    IMG_FILTER_CATEGORY = imgs

  } else if (category == 'all' && color != 'all') {
    IMG_FILTER_CATEGORY = imgs.filter((e) => { return (e.color == color) })
  } else if (category != 'all' && color == 'all') {
    IMG_FILTER_CATEGORY = imgs.filter((e) => { return (e.category == category) })
    if (subCategory != 'all') {
      IMG_FILTER_CATEGORY = IMG_FILTER_CATEGORY.filter((e) => { return (e.subCategory == subCategory) })
    }
  } else if (category != 'all' && color != 'all') {
    IMG_FILTER_CATEGORY = imgs.filter((e) => { return (e.category == category) })
    IMG_FILTER_CATEGORY = IMG_FILTER_CATEGORY.filter((e) => { return (e.color == color) })
    if (subCategory != 'all') {
      IMG_FILTER_CATEGORY = IMG_FILTER_CATEGORY.filter((e) => { return (e.subCategory == subCategory) })
    }
  }
  if (type != 'all') {
    IMG_FILTER_CATEGORY = IMG_FILTER_CATEGORY.filter((e) => { return (e.type == type) })

  } 
  useEffect(() => {
    setPagina(Math.floor((sup + 1) / 20))
  })
  return (<>


    <div className='container-galery'>

      {IMG_FILTER_CATEGORY.slice(inf, sup).map((val, index) => {
        if (val.type == 'video') {
          return (
            <div key={val.id} className='container-img'>
              <Link to={`/Detail/${val.id}`}>
                <video controls className={val.id % 2 ? 'img' : 'img2'} src={val.photo} alt="" />
              </Link>

            </div>
          )
        } else {
          return (
            <div key={val.id} className='container-img'>
              <Link to={`/Detail/${val.id}`}>
                <img className={val.id % 2 ? 'img' : 'img2'} src={val.photo} alt="" />
              </Link>

            </div>
          )
        }
      }

      )}

    </div>
    <br />
    <br />

    <div className='paginacion'>
      <div className='paginacion-botonera'>
        <button
          onClick={(e) => {
            if (inf > 0) {
              setInf(inf - 21)
              setSup(sup - 21)
            }
          }}>
          Prev
        </button>
        <input disabled value={pagina} onChange={e => setPagina(e.target.value)} />
        <button
          onClick={(e) => {
            if (sup < IMG_FILTER_CATEGORY.length) {
              setInf(inf + 21)
              setSup(sup + 21)
            }
          }}>
          Next
        </button>
        <p>de {Math.ceil(IMG_FILTER_CATEGORY.length / 20)}</p>
      </div>
    </div>

  </>)
}

export default Galery