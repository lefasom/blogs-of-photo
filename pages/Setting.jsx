import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Setting() {
    const { isAuthenticated, user } = useAuth0()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <div className='container-upload_description'>
                <div className='container-upload_description-A'>
                    <h3> {user.nickname}</h3>
                    {'>'}
                    <p>Setting </p>
                </div>
            </div>
        </div>
    )
}

export default Setting