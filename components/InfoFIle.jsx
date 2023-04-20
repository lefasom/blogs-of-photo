import React from 'react'
import '../styles/infoFile.css'
function InfoFIle({nickname,title,length}) {
    return (
        <div className='container-upload_description'>
            <div className='container-upload_description-A'>
                <h3> {nickname}</h3>
                {'>'}
                <p>{title} </p>
            </div>
            <div className='container-upload_description-B'>
                <h1>{title}({length})</h1>
            </div>
        </div>
    )
}

export default InfoFIle