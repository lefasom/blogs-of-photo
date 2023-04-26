import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

function Setting() {
    const { user } = useAuth0()

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <div className='container-upload_description'>
                <div className='container-upload_description-A'>
                    <h3> {user?.nickname}</h3>
                    {'>'}
                    <p>Setting </p>
                </div>
            </div>
        </div>
    )
}

export default withAuthenticationRequired(Setting)