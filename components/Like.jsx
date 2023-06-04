import React from 'react'
import useFavoriteIndividual from '../hooks/useFavoriteIndividual'
import { useSelector } from 'react-redux'

function Like(props) {
    const auth = useSelector((state) => state.auth.list.email)
    const [inFavor, favor] = useFavoriteIndividual(props.id)

    return (
        <div className={inFavor ? 'container-detail_controls-red' : 'container-detail_controls'}>
            {auth && <>
                <ion-icon onClick={favor} name="heart"></ion-icon>
            </>}


        </div>
    )
}

export default Like