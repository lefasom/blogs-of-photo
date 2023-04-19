import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/galery.css'

function Galery({ imgs }) {

  return (
    <div className='container'>
      {imgs.map((val) => (
        <div key={val.id} className='container-img'>
          <Link to={`/Detail/${val.id}`}>
            <img className={val.id % 2 ? 'img' : 'img2'} src={val.photo} alt="" />
          </Link>

        </div>
      ))}
    </div>
  )
}

export default Galery