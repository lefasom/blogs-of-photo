import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { blogAnime } from '../src/assets/img'
import Galery from '../components/Galery'

function Favorite() {
    const { isAuthenticated, user } = useAuth0()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <div className='container-upload_description'>
                <div className='container-upload_description-A'>
                    <h3> {user.nickname}</h3>
                    {'>'}
                    <p>Favorite </p>
                </div>
                <div className='container-upload_description-B'>
                    <h1>Favorite(12)</h1>
                </div>
            </div>
            <Galery imgs={blogAnime} />
        </>
    )
}

export default Favorite